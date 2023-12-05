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
    <StyledNavItem
      to={route}
      onClick={() => setNav(false)}
      className={(isActive) => (isActive ? 'active' : '')}
    >
      <div className={'icon-container'}>{icon}</div>
      {open && <div className={'title-container'}>{title}</div>}
    </StyledNavItem>
  );
}

const StyledNavItem = styled(NavLink)`
  height: 30px;
  padding: 10px 0;
  display: flex;
  text-decoration: none;
  align-items: center;
  width: 150px;

  .title-container {
    color: white;
    font-weight: 100;
  }

  .icon-container {
    width: 42px;
    margin-right: 8px;
    display: flex;
    justify-content: center;
    svg {
      font-size: 18px;
      color: white;
    }
  }

  &.active {
    .icon-container {
      background-color: white;
      padding: 5px 0;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;

      svg {
        font-size: 18px;
        color: black;
      }
    }
  }
`;
