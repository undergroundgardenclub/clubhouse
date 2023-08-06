import React from "react";
import styled from "styled-components";
import Marquee from "react-fast-marquee";
import { ugcTheme } from "../styled/theme";
import { useUser } from "../users/useUser";
import { ProfilePanel } from "../users/ProfilePanel";
import { useStore } from "zustand";
import { modalStore } from "./useModal";
import { StyledButton, StyledButtonAvatar } from "../styled/StyledButton";
import { LogoSkewer } from "./LogoSkewer";
import { ProjectCreatorButton } from "../projects/ProjectCreatorButton";
import { PersonIcon } from "@radix-ui/react-icons";
import { sidebarStore } from "./useSidebar";

export const HeaderActions: React.FC<{ hide?: string[]; invert?: boolean }> = (
  props
) => {
  const modal = useStore(modalStore);
  const sidebar = useStore(sidebarStore);
  const { data: user } = useUser();
  // RENDER
  return (
    <StyledHeaderActions invert={props.invert}>
      {/* {props.hide?.includes("logo") === false && (
        <div className="header__logo">
          <LogoSkewer />
        </div>
      )} */}
      <div className="header__inspo">
        <StyledButton
          variant={sidebar.viewType === "projects" ? "green" : "blue"}
          onClick={() => sidebar.setViewType("projects")}
        >
          FIND YOUR PEOPLE
        </StyledButton>
        <StyledButton
          variant={sidebar.viewType === "equipment" ? "green" : "blue"}
          onClick={() => sidebar.setViewType("equipment")}
        >
          BUILD YOUR LAB
        </StyledButton>
        {/* <Marquee autoFill>
          <div>FIND YOUR CLUB&ensp;</div>
        </Marquee> */}
        {/* <div>WE GROW TOGETHER&ensp;</div> */}
        {/* <div>JUST KEEP GROWING&ensp;</div>
        <div>FUCK AROUND&ensp;BUILD SHIT&ensp;</div>
        <div>JUST GROW IT&ensp;</div> */}
      </div>
      <div className="header__actions">
        {/* <Link href="/" passHref>
          <StyledButton variant={props.invert ? "green" : "blue"}>
            BIO-QUESTS
          </StyledButton>
        </Link> */}
        {/* <ProjectCreatorButton /> */}
        {/* <Link href="/community" passHref>
          <StyledButton variant={props.invert ? "green" : "blue"}>
          COMMUNITY
          </StyledButton>
        </Link> */}
        {user?.id && (
          <StyledButtonAvatar
            variant={props.invert ? "green" : "blue"}
            onClick={() => modal.setIsOpen(true, <ProfilePanel />)}
          >
            {user.avatar_url ? (
              <img alt="profile" src={user.avatar_url} />
            ) : (
              <PersonIcon />
            )}
          </StyledButtonAvatar>
        )}
      </div>
      {/* TODO: music player */}
    </StyledHeaderActions>
  );
};

const StyledHeaderActions = styled.header<{ invert?: boolean }>`
  z-index: 5;
  display: flex;
  align-items: center;
  justify-content: space-between;
  pointer-events: none;
  padding-bottom: 0.5em;
  .header__logo {
    // transform: rotate(180deg);
    svg {
      mix-blend-mode: difference;
      path {
        fill: ${(props) =>
          props.invert
            ? ugcTheme.colors.green[500]
            : ugcTheme.colors.blue[500]};
      }
    }
    &,
    svg {
      height: 32px; // 32px
      @media (max-width: 45em) {
        height: 32px;
      }
    }
  }
  .header__inspo {
    flex-grow: 1;
    color: blue;
    font-family: ${ugcTheme.fonts.display};
    color: ${(props) =>
      props.invert ? ugcTheme.colors.green[500] : ugcTheme.colors.blue[500]};
    font-size: 24px;
    overflow: hidden;
    width: 100%;
    // padding-top: 0.25em;
    // border-left: 2px solid;
    // border-right: 2px solid;
    // border-color: ${ugcTheme.colors.green[500]};
    align-items: center;
    display: flex;
    & > button {
      flex: 1;
      margin: 0 0.5em;
      font-size: 18px;
      &:first-of-type {
        margin-left: 0;
      }
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
  .header__actions {
    flex-grow: 1;
    display: flex;
    margin-left: 0.5em;
    white-space: nowrap;
    @media (max-width: 45em) {
      justify-content: right;
    }
  }
`;
