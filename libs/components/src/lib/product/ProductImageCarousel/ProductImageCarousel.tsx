import styled from 'styled-components';
import { useState } from 'react';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';

interface ProductImage {
  url: string;
  index: number;
}
interface ProductImageCarouselProps {
  images: ProductImage[];
}

export function ProductImageCarousel(props: ProductImageCarouselProps) {
  const { images } = props;
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <StyledImageCarousel>
      <ImageContainer>
        {images.map((image, index) => (
          <MainImage
            key={index}
            src={image.url}
            alt={`Image ${index + 1}`}
            isActive={index === activeIndex}
          />
        ))}
      </ImageContainer>
      <ThumbnailContainer>
        {images.map((image, index) => (
          <Thumbnail
            key={index}
            src={image.url}
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setActiveIndex(index)}
            isActive={index === activeIndex}
          />
        ))}
      </ThumbnailContainer>

      <NavButton onClick={handlePrev} className="left">
        <RxCaretLeft />
      </NavButton>
      <NavButton onClick={handleNext} className="right">
        <RxCaretRight />
      </NavButton>
    </StyledImageCarousel>
  );
}

export default ProductImageCarousel;

const StyledImageCarousel = styled.div`
  margin: auto;
  position: relative;
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: calc(800 / 600 * 100%);
  overflow: hidden;
`;

const MainImage = styled.img<{ isActive: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  object-fit: cover;
  top: 0;
  right: ${({ isActive }) => (isActive ? '0' : '100%')};
  transition: right 0.5s ease-in-out;
  z-index: ${({ isActive }) => (isActive ? '1' : '0')};
`;

const ThumbnailContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
`;

const Thumbnail = styled.img<{ isActive: boolean }>`
  width: 50px;
  height: 50px;
  object-fit: cover;
  cursor: pointer;
  margin: 0 5px;
  border-radius: 10px;
  border-bottom: ${({ isActive }) => (isActive ? '2px solid black' : 'none')};
`;

const NavButton = styled.button`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 50%;
  background: none;
  border: none;
  font-size: 25px;
  cursor: pointer;
  border-radius: 6px;
  background-color: white;
  color: black;
  height: 30px;
  width: 30px;
  opacity: 0.8;
  z-index: 1;

  &.left {
    left: 10px;
  }

  &.right {
    right: 10px;
  }
`;
