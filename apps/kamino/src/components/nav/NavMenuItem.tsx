import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { navAtom } from '../../recoil/Nav';

interface TNavMenuItem {
  icon: React.ReactNode;
  title: string;
  route: string;
}

const StyledNavItem = styled.div`
  text-decoration: none;
  padding 0.5rem 0.5rem;
  margin:  1rem 0;
  color: black;
  position: relative;
  display: flex;
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

const NavMenuItem = ({ icon, route, title }: TNavMenuItem) => {
  const setNav = useSetRecoilState(navAtom);

  return (
    <NavLink to={route} onClick={() => setNav(false)}>
      <StyledNavItem>
        {icon}
        <div>{title}</div>
      </StyledNavItem>
    </NavLink>
  );
};

export default NavMenuItem;
