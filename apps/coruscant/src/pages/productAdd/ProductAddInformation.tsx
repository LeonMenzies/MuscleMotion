import styled from 'styled-components';
import { Text } from '@musclemotion/components';

import { ProductT } from '@musclemotion/types';

interface ProductAddInformationProps {
  handleFieldChange: (fieldName: keyof ProductT, value: string | Blob) => void;
  product: ProductT;
}

export function ProductAddInformation(props: ProductAddInformationProps) {
  const { handleFieldChange, product } = props;

  return (
    <StyledProductAddInformation>
      <Text
        title={'name'}
        id={'product-name'}
        type={'text'}
        value={product.name}
        onChange={(event) => handleFieldChange('name', event.target.value)}
      />

      {/* <ProductDisplay onClick={() => {}} product={product} /> */}
    </StyledProductAddInformation>
  );
}

export default ProductAddInformation;

const StyledProductAddInformation = styled.div`
  width: 100%;
  background-color: yellow;
`;
