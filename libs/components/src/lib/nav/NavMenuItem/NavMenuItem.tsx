import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

/* eslint-disable-next-line */
export interface NavMenuItemProps {
  open: boolean;
  icon: React.ReactNode;
  title: string;
  route: string;
  setNav: (b: boolean) => void;
}

export function NavMenuItem(props: NavMenuItemProps) {
  const { open, icon, route, title, setNav } = props;

  return (
    <NavLink to={route} onClick={() => setNav(false)}>
      <StyledNavItem>
        {icon}
        {open && <div>{title}</div>}
      </StyledNavItem>
    </NavLink>
  );
}

const StyledNavItem = styled.div`
  text-decoration: none;
  padding 0.5rem 0.5rem;
  margin:  1rem 0;
  color: black;
  position: relative;
  display: flex;
  padding: 0.3rem;
`;
