import styled from 'styled-components';
import { Image } from '@musclemotion/components';

interface ProductAddImagesProps {
  handleImageFieldChange: (imageType: string, value: Blob | null) => void;
}

export function ProductAddImages(props: ProductAddImagesProps) {
  const { handleImageFieldChange } = props;
  return (
    <StyledProductAddImages>
      <Image
        onImageChange={(file) => handleImageFieldChange('displayPrimary', file)}
        buttonText={'Display Primary'}
      />
      <Image
        onImageChange={(file) =>
          handleImageFieldChange('displaySecondary', file)
        }
        buttonText={'Display Secondary'}
      />
    </StyledProductAddImages>
  );
}

export default ProductAddImages;

const StyledProductAddImages = styled.div`
  background-color: blue;
  width: 100%;
`;
