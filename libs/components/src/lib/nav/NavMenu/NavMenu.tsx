import styled from 'styled-components';
import { NavMenuItem } from '../NavMenuItem/NavMenuItem';

import { BsBag } from 'react-icons/bs';
// import { CiUser } from 'react-icons/ci';
// import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
// import { RiAdminLine } from 'react-icons/ri';

/* eslint-disable-next-line */
export interface NavMenuProps {
  nav: boolean;
  setNav: (b: boolean) => void;
}

interface NavMenuStylesProps {
  open: boolean;
}

export function NavMenu(props: NavMenuProps) {
  const { nav, setNav } = props;

  return (
    <StyledNavMenu open={nav}>
      <div className={'nav-menu-header'}>{`Test User`}</div>
      <NavMenuItem
        icon={<BsBag />}
        title={'Cart'}
        route={'/cart'}
        setNav={setNav}
      />

      {/* {user.loggedIn ? (
        <>
          <NavMenuItem
            icon={<CiUser />}
            title={'Profile'}
            route={'/profile'}
            setNav={setNav}
          />
          <NavMenuItem
            icon={<AiOutlineLogout />}
            title={'Logout'}
            route={'/logout'}
            setNav={setNav}
          />
        </>
      ) : (
        <NavMenuItem
          icon={<AiOutlineLogin />}
          title={'Login'}
          route={'/login'}
          setNav={setNav}
        />
      )} */}

      {/* {user.user.Roles && (
        <NavMenuItem
          icon={<RiAdminLine />}
          title={'Admin'}
          route={'/admin'}
          setNav={setNav}
        />
      )} */}
    </StyledNavMenu>
  );
}

const StyledNavMenu = styled.div<NavMenuStylesProps>`
  position: fixed;
  height: 100%;
  background: grey;
  right: 0;
  width: ${({ open }) => (open ? '200px' : '0')};
  transition: 0.3s;

  .nav-menu-header {
    padding: 1rem;
  }
`;
