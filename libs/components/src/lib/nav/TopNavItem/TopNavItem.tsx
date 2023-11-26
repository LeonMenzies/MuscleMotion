import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface TopNavItemProps {
  to: string;
  title: string;
}

export function TopNavItem(props: TopNavItemProps) {
  const { to, title } = props;

  return (
    <StyledTopNavItem to={to}>
      <span>{title}</span>
    </StyledTopNavItem>
  );
}

export default TopNavItem;

const StyledTopNavItem = styled(NavLink)`
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
