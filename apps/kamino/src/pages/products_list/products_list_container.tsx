import styled from 'styled-components';

/* eslint-disable-next-line */
export interface ProductsListContainerProps {}

export function ProductsListContainer(props: ProductsListContainerProps) {
  return <StyledProductsListContainer>{'text'}</StyledProductsListContainer>;
}

export default ProductsListContainer;

const StyledProductsListContainer = styled.div`
  color: pink;
`;
