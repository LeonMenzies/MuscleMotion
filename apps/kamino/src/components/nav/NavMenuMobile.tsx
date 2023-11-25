import styled from 'styled-components';

const StyledNav = styled.div`
  display: flex;
  flex-direction: row;
`;

interface TNavMenuMobile {
  open: boolean;
}

const NavMenuMobile = ({ open }: TNavMenuMobile) => {
  return <StyledNav>Nav mobile</StyledNav>;
};

export default NavMenuMobile;
