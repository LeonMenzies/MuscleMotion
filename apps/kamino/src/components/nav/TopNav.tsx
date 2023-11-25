import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { Squash as Hamburger } from 'hamburger-react';
import { useRecoilState } from 'recoil';
import { navAtom } from '../../recoil/Nav';

import { NavItem } from '../../components/nav/TopNavItem';
import { TopNavMenu } from '../../components/nav/TopNavMenu';

import MuscleMotionAltLogo from '../../assets/images/muscle-motion.jpg';

const TopNav = () => {
  const [showNav, setShowNav] = useRecoilState(navAtom);

  return (
    <StyledNav>
      <div className={'container'}>
        <NavLink to={'/'}>
          <img
            className={'navLogo'}
            src={MuscleMotionAltLogo}
            alt="MuscleMotionAltLogo"
            width="32"
            height="32"
          />
        </NavLink>

        <div>
          <NavItem to={'/mens'} title={'Mens'} />
          <NavItem to={'/womans'} title={'Womans'} />
          <NavItem to={'/accessories'} title={'Accessories'} />
          <NavItem to={'/supplements'} title={'Supplements'} />
        </div>

        <div className={'right-nav'}>
          <Hamburger toggled={showNav} toggle={setShowNav} size={20} />
        </div>
      </div>
      <TopNavMenu />
    </StyledNav>
  );
};

export default TopNav;

const StyledNav = styled.div`
  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    height: 5rem;
    padding: 0 1rem;
    background-color: red;
  }

  .navLogo {
    object-fit: cover;
  }

  .right-nav {
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
  }
`;
