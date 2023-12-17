import { AWS_PRODUCT_IMAGES_BASE } from '@musclemotion/constants';
import { ProductResponseT } from '@musclemotion/types';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

export interface ProductDisplayProps {
  product: ProductResponseT;
  onClick: () => void;
}

interface ImageProps {
  hovered: boolean;
}

export function ProductDisplay(props: ProductDisplayProps) {
  const { product, onClick } = props;
  const [hovered, setHovered] = useState(false);
  const [images, setImages] = useState({ primary: '', secondary: '' });

  useEffect(() => {
    if (!product.ProductImages) return;

    const images = product.ProductImages.reduce(
      (acc, image) => {
        if (image.ProductImageType.imageType === 'displayPrimary') {
          console.log(image);

          acc.primary = AWS_PRODUCT_IMAGES_BASE + image.imageUrl;
        } else if (image.ProductImageType.imageType === 'displaySecondary') {
          acc.secondary = AWS_PRODUCT_IMAGES_BASE + image.imageUrl;
        }
        return acc;
      },
      { primary: '', secondary: '' }
    );

    setImages(images);
  }, [product]);

  return (
    <StyledProductDisplay
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <StyledImagePreview
        src={images.primary}
        alt="Selected Image"
        hovered={hovered}
      />
      <HoveredImagePreview
        src={images.secondary}
        alt="Selected Image"
        hovered={hovered}
      />

      <h1>{product.name}</h1>
      <h2>${product.price}</h2>
    </StyledProductDisplay>
  );
}
export default ProductDisplay;

const StyledProductDisplay = styled.div`
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
