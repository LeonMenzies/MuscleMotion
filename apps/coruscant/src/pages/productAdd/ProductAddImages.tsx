import styled from 'styled-components';

interface ProductAddImagesProps {}

export function ProductAddImages(props: ProductAddImagesProps) {
  return <StyledProductAddImages>Test</StyledProductAddImages>;
}

export default ProductAddImages;

const StyledProductAddImages = styled.div`
  background-color: green;
  width: 50%;
`;
