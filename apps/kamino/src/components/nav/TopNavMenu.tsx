import { FC } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

type TopNavMenuT = {};

export const TopNavMenu: FC<TopNavMenuT> = ({}) => {
  return <StyledNavItem>{/* <span>{title}</span> */}</StyledNavItem>;
};

const StyledNavItem = styled.div`
  text-decoration: none;
  padding 0.5rem 0.5rem;
  margin: 0 1rem;
  color: black;
  position: relative;
  padding: 0.3rem;
  
  ::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 0.1rem;
    bottom: 0;
    left: 0;
    background-color: black;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  :hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;
