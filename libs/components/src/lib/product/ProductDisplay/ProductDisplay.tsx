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
      <div style={{ height: '80%' }}>
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
      </div>

      <TextContainer>
        <h3>{product.name}</h3>
        <h5>${product.price}</h5>
      </TextContainer>
    </StyledProductDisplay>
  );
}
export default ProductDisplay;

const TextContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  width: 90%;
  position: absolute;
  height: 15%;
  bottom: 0;
  align-items: center;
`;

const StyledProductDisplay = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  width: 200px;
  height: 300px;
  margin: 20px;
  overflow: hidden;
`;

const StyledImagePreview = styled.img<ImageProps>`
  width: 100%;
  height: 85%;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s ease;
  z-index: ${(props) => (props.hovered ? 1 : 2)};
  opacity: ${(props) => (props.hovered ? 0 : 1)};
`;

const HoveredImagePreview = styled.img<ImageProps>`
  width: 100%;
  height: 85%;
  position: absolute;
  top: 0;
  left: 0;
  transition: opacity 0.3s ease;
  z-index: ${(props) => (props.hovered ? 2 : 1)};
  opacity: ${(props) => (props.hovered ? 1 : 0)};
`;
