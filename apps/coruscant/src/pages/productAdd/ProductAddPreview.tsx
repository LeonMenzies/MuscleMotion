import styled from 'styled-components';
import {
  ProductInformationT,
  ProductT,
  ProductImagesT,
} from '@musclemotion/types';
import { useState } from 'react';

interface ProductAddPreviewProps {
  product: ProductT;
  productInformation: ProductInformationT;
  productImages: ProductImagesT;
}

interface ImageProps {
  hovered: boolean;
}

export function ProductAddPreview(props: ProductAddPreviewProps) {
  const { product, productInformation, productImages } = props;
  const [hovered, setHovered] = useState(false);

  return (
    <StyledProductAddPreview
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {productImages.displayPrimary && (
        <StyledImagePreview
          src={URL.createObjectURL(productImages.displayPrimary)}
          alt="Primary Image"
          hovered={hovered}
        />
      )}
      {productImages.displaySecondary && (
        <HoveredImagePreview
          src={URL.createObjectURL(productImages.displaySecondary)}
          alt="Secondary Image"
          hovered={hovered}
        />
      )}

      <h1>{product.name}</h1>
      <h2>${product.price}</h2>
      <p>{productInformation.description}</p>
    </StyledProductAddPreview>
  );
}

export default ProductAddPreview;

const StyledProductAddPreview = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-width: 300px;
  margin: 20px;
  overflow: hidden;

  h1 {
    margin-top: 10px;
  }

  h2 {
    font-size: 0.8em;
    margin-top: 5px;
  }
`;

const StyledImagePreview = styled.img<ImageProps>`
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s ease;
  z-index: ${(props) => (props.hovered ? 1 : 2)};
  opacity: ${(props) => (props.hovered ? 0 : 1)};
`;

const HoveredImagePreview = styled.img<ImageProps>`
  width: 100%;
  height: auto;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s ease;
  z-index: ${(props) => (props.hovered ? 2 : 1)};
  opacity: ${(props) => (props.hovered ? 1 : 0)};
`;
