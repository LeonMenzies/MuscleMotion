import styled from 'styled-components';
import { NavMenuItem } from '../NavMenuItem/NavMenuItem';
import { Squash as Hamburger } from 'hamburger-react';
import { NavItem } from '@musclemotion/types';
import { useEffect } from 'react';

/* eslint-disable-next-line */
export interface NavMenuProps {
  nav: boolean;
  setNav: React.Dispatch<React.SetStateAction<boolean>>;
  navItems: NavItem[];
}

interface NavMenuStylesProps {
  open: boolean;
}

export function NavMenu(props: NavMenuProps) {
  const { nav, setNav, navItems } = props;

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

  return (
    <StyledNavMenu open={nav} className={'nav-menu'}>
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
    </StyledNavMenu>
  );
}

const StyledNavMenu = styled.div<NavMenuStylesProps>`
  position: fixed;
  height: 100%;
  background: #343434;
  display: flex;
  flex-direction: column;

  width: ${({ open }) => (open ? '200px' : '50')};
  transition: 0.3s;

  .nav-menu-header {
    padding: 1rem;
  }
`;
