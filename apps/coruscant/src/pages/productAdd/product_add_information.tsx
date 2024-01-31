import styled from 'styled-components';
import { Text } from '@musclemotion/components';
import DualListBox from 'react-dual-listbox';
import 'react-dual-listbox/lib/react-dual-listbox.css';

import {
  ColorsResponseT,
  ProductInformationT,
  SizesResponseT,
} from '@musclemotion/types';
import { useEffect, useState } from 'react';
import { useFetchApi } from '@musclemotion/hooks';
import {
  FaAngleDoubleLeft,
  FaAngleLeft,
  FaAngleRight,
  FaAngleDoubleRight,
} from 'react-icons/fa';

interface ProductAddInformationProps {
  handleInformationFieldChange: (
    fieldName: keyof ProductInformationT,
    value: string | Blob | number[]
  ) => void;
  productInformation: ProductInformationT;
}

type OptionType = {
  value: number;
  label: string;
};

export function ProductAddInformation(props: ProductAddInformationProps) {
  const { handleInformationFieldChange, productInformation } = props;

  const [sizesResponse, , fetchSizes] =
    useFetchApi<SizesResponseT[]>('/size/sizes');

  const [colorsResponse, , fetchColors] =
    useFetchApi<ColorsResponseT[]>('/color/colors');

  const [sizeOptions, setSizeOptions] = useState<OptionType[]>([]);
  const [colorOptions, setColorOptions] = useState<OptionType[]>([]);

  useEffect(() => {
    fetchSizes();
    fetchColors();
  }, [fetchSizes, fetchColors]);

  useEffect(() => {
    if (sizesResponse.success && sizesResponse.data) {
      const options = sizesResponse.data.map((item) => ({
        value: item.id,
        label: item.displayName,
      }));

      setSizeOptions(options);
    }
  }, [sizesResponse.data, sizesResponse.success]);

  useEffect(() => {
    if (colorsResponse.success && colorsResponse.data) {
      const options = colorsResponse.data.map((item) => ({
        value: item.id,
        label: item.displayName,
      }));

      setColorOptions(options);
    }
  }, [colorsResponse.data, colorsResponse.success]);

  const icons = {
    moveLeft: <FaAngleLeft />,
    moveAllLeft: <FaAngleDoubleLeft />,
    moveRight: <FaAngleRight />,
    moveAllRight: <FaAngleDoubleRight />,
  };

  return (
    <StyledProductAddInformation>
      <Text
        title={'description'}
        id={'product-description'}
        type={'text'}
        value={productInformation.description}
        onChange={(event) =>
          handleInformationFieldChange('description', event.target.value)
        }
      />
      <DualListBox
        canFilter
        options={sizeOptions}
        selected={productInformation.sizes}
        onChange={(sizes) => handleInformationFieldChange('sizes', sizes)}
        icons={icons}
      />
      <DualListBox
        canFilter
        options={colorOptions}
        selected={productInformation.colors}
        onChange={(colors) => handleInformationFieldChange('colors', colors)}
        icons={icons}
      />
    </StyledProductAddInformation>
  );
}

export default ProductAddInformation;

const StyledProductAddInformation = styled.div`
  width: 100%;
  background-color: yellow;
`;
