import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

import { TopNavItem } from '../TopNavItem/TopNavItem';

/* eslint-disable-next-line */
export interface TopNavProps {
  logo: string;
}

export function TopNav(props: TopNavProps) {
  const { logo } = props;
  return (
    <StyledNav>
      <div className={'container'}>
        <NavLink to={'/'}>
          <img
            className={'navLogo'}
            src={logo}
            alt="MuscleMotionAltLogo"
            width="32"
            height="32"
          />
        </NavLink>

        <div>
          <TopNavItem to={'/mens'} title={'Mens'} />
          <TopNavItem to={'/womans'} title={'Womans'} />
          <TopNavItem to={'/accessories'} title={'Accessories'} />
          <TopNavItem to={'/supplements'} title={'Supplements'} />
        </div>
      </div>
    </StyledNav>
  );
}

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
