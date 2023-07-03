import { useMutation, useQuery } from "react-query";
import { TUser } from "./types";
import { supaClient } from "../query/supaClient";
import { queryClient } from "../query/queryClient";

// FETCHES
export const useUser = () => {
  return useQuery<TUser | null>(["user"], async () => {
    // fetch authed
    const { data: authedUser } = await supaClient.auth.getUser();
    if (!authedUser?.user) return null;

    // fetch profile
    const { data: profileUser } = await supaClient
      .from("user")
      .select()
      .eq("auth_user_id", authedUser.user.id);

    // HACK: if no profile, create one (wrorried about duplication but w/e for now)
    if (profileUser?.length === 0) {
      const { data: newProfileUser } = await supaClient
        .from("user")
        .insert({
          auth_user_id: authedUser.user.id,
          name: authedUser.user.user_metadata.name,
          email: authedUser.user.user_metadata.email,
          avatar_url: authedUser.user.user_metadata.avatar_url,
        })
        .select();
      return newProfileUser?.[0];
    }

    // return
    return profileUser?.[0];
  });
};

// UPDATES

// AUTH
export const useUserLogin = () => {
  return useMutation(
    async ({ provider, redirectTo }: any): Promise<TUser> => {
      const { data, error }: any = await supaClient.auth.signInWithOAuth({
        provider,
        options: { redirectTo },
      });
      if (error) throw error;
      return data;
    },
    {
      onSettled: async () => queryClient.resetQueries(["user"]),
    }
  );
};

export const useUserLogout = () => {
  return useMutation(async () => await supaClient.auth.signOut(), {
    onSettled: async () => queryClient.resetQueries(["user"]),
  });
};
