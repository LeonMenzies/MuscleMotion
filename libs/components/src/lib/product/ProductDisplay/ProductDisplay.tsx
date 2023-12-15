import { ProductT } from '@musclemotion/types';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

export interface ProductDisplayProps {
  product: ProductT;
  onClick: () => void;
}

interface ImageProps {
  hovered: boolean;
}

export function ProductDisplay(props: ProductDisplayProps) {
  const { product, onClick } = props;
  const [displayImage1Url, setDisplayImage1Url] = useState<string | null>(null);
  const [displayImage2Url, setDisplayImage2Url] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);

  // useEffect(() => {
  //   const reader1 = new FileReader();
  //   reader1.onload = () => {
  //     setDisplayImage1Url(reader1.result as string);
  //   };
  //   reader1.readAsDataURL(product.displayImage1 ?? new Blob());

  //   const reader2 = new FileReader();
  //   reader2.onload = () => {
  //     setDisplayImage2Url(reader2.result as string);
  //   };
  //   reader2.readAsDataURL(product.displayImage2 ?? new Blob());
  // }, [product.displayImage1, product.displayImage2]);

  return (
    <StyledProductDisplay
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <StyledImagePreview
        src={displayImage1Url || ''}
        alt="Selected Image"
        hovered={hovered}
      />
      <HoveredImagePreview
        src={displayImage2Url || ''}
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
