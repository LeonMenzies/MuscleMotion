import styled from 'styled-components';
import NavMenuItem from '../../components/nav/NavMenuItem';
import { useRecoilValue } from 'recoil';
import { userAtom } from '../../recoil/User';

import { BsBag } from 'react-icons/bs';
import { CiUser } from 'react-icons/ci';
import { AiOutlineLogin, AiOutlineLogout } from 'react-icons/ai';
import { RiAdminLine } from 'react-icons/ri';

const StyledNavMenu = styled.div<TNavMenuStyles>`
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

interface TNavMenu {
  open: boolean;
}

interface TNavMenuStyles {
  open: boolean;
}

const NavMenu = ({ open }: TNavMenu) => {
  const user = useRecoilValue(userAtom);

  return (
    <StyledNavMenu open={open}>
      <div
        className={'nav-menu-header'}
      >{`${user.user.FirstName} ${user.user.LastName}`}</div>
      <NavMenuItem icon={<BsBag />} title={'Cart'} route={'/cart'} />

      {user.loggedIn ? (
        <>
          <NavMenuItem icon={<CiUser />} title={'Profile'} route={'/profile'} />
          <NavMenuItem
            icon={<AiOutlineLogout />}
            title={'Logout'}
            route={'/logout'}
          />
        </>
      ) : (
        <NavMenuItem
          icon={<AiOutlineLogin />}
          title={'Login'}
          route={'/login'}
        />
      )}

      {user.user.Roles && (
        <NavMenuItem icon={<RiAdminLine />} title={'Admin'} route={'/admin'} />
      )}
    </StyledNavMenu>
  );
};

export default NavMenu;
