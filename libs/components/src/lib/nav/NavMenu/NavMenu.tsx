import styled from 'styled-components';
import { NavMenuItem } from '../NavMenuItem/NavMenuItem';
import { Squash as Hamburger } from 'hamburger-react';
import { NavItem } from '@musclemotion/types';
import { useEffect } from 'react';
import { RiLogoutBoxFill } from 'react-icons/ri';

/* eslint-disable-next-line */
export interface NavMenuProps {
  nav: boolean;
  hide?: boolean;
  logOut?: () => void;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
  navItems: NavItem[];
}

interface NavMenuStylesProps {
  open: boolean;
}

export function NavMenu(props: NavMenuProps) {
  const { nav, setNav, navItems, hide, logOut } = props;

  useEffect(() => {
    const handleClickAway = (event: MouseEvent) => {
      if (!(event.target as HTMLElement).closest('.nav-menu')) {
        setNav(false);
      }
    };
    document.addEventListener('click', handleClickAway);
    return () => {
      document.removeEventListener('click', handleClickAway);
    };
  }, [setNav]);

  return hide ? null : (
    <StyledNavMenu open={nav} className={'nav-menu'}>
      <div>
        <Hamburger toggled={nav} toggle={setNav} size={20} color={'white'} />
        {navItems.map((item: NavItem, index: number) => (
          <NavMenuItem
            key={index}
            open={nav}
            icon={item.icon}
            title={item.title}
            route={item.route}
            setNav={setNav}
          />
        ))}
      </div>
      <StyledNavItem onClick={logOut}>
        <div className={'icon-container'}>
          <RiLogoutBoxFill onClick={logOut} />
        </div>
        {nav && <div className={'title-container'}>{'Log Out'}</div>}
      </StyledNavItem>
    </StyledNavMenu>
  );
}

const StyledNavItem = styled.div`
  height: 30px;
  padding: 10px 0;
  display: flex;
  text-decoration: none;
  align-items: center;
  width: 150px;
  margin-bottom: 10px;
  .title-container {
    color: white;
    font-weight: 100;
  }

  .icon-container {
    padding-left: 4px;

    width: 42px;
    margin-right: 8px;
    display: flex;
    justify-content: center;
    svg {
      font-size: 18px;
      color: white;
    }
  }
`;

const StyledNavMenu = styled.div<NavMenuStylesProps>`
  position: fixed;
  height: 100%;
  background: #343434;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 5;
  justify-content: space-between;

  width: ${({ open }) => (open ? '200px' : '50px')};
  transition: 0.4s;

  .nav-menu-header {
    padding: 1rem;
  }
`;
