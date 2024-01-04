import styled from 'styled-components';
import { Text } from '@musclemotion/components';

import { ProductInformationT } from '@musclemotion/types';

interface ProductAddInformationProps {
  handleFieldChange: (
    fieldName: keyof ProductInformationT,
    value: string | Blob
  ) => void;
  productInformation: ProductInformationT;
}

export function ProductAddInformation(props: ProductAddInformationProps) {
  const { handleFieldChange, productInformation } = props;

  return (
    <StyledProductAddInformation>
      <Text
        title={'description'}
        id={'product-description'}
        type={'text'}
        value={productInformation.description}
        onChange={(event) =>
          handleFieldChange('description', event.target.value)
        }
      />
    </StyledProductAddInformation>
  );
}

export default ProductAddInformation;

const StyledProductAddInformation = styled.div`
  width: 100%;
  background-color: yellow;
`;
