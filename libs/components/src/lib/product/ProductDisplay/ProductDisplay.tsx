import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ProductDisplayProps {}

const StyledProductDisplay = styled.div`
  color: pink;
`;

export function ProductDisplay(props: ProductDisplayProps) {
  return (
    <StyledProductDisplay>
      <h1>Welcome to ProductDisplay!</h1>
    </StyledProductDisplay>
  );
}

export default ProductDisplay;
