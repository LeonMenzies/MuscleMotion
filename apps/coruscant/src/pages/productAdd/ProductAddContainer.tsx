import styled from 'styled-components';
import { Text, Button } from '@musclemotion/components';
import { useState } from 'react';
import { usePostApi } from '@musclemotion/hooks';
import { Product } from '@musclemotion/types';

export interface ProductAddContainerProps {}

export function ProductAddContainer(props: ProductAddContainerProps) {
  const [postProductsResponse, postProductsLoading, postProducts] =
    usePostApi<Product>('/api/product');

  const [product, setProduct] = useState<Product>({
    name: '',
    price: 0,
  });

  const handleFieldChange = (
    fieldName: keyof typeof product,
    value: string
  ) => {
    setProduct({
      ...product,
      [fieldName]: value,
    });
  };

  const handleAdd = async () => {
    postProducts(product);
  };

  return (
    <StyledProductList>
      <Text
        title={'name'}
        id={'product-name'}
        type={'text'}
        value={product.name}
        onChange={(event) => handleFieldChange('name', event.target.value)}
      />
      <Text
        title={'price'}
        id={'product-price'}
        type={'number'}
        value={product.price}
        onChange={(event) => handleFieldChange('price', event.target.value)}
      />
      <Button text={'Add'} onClick={() => handleAdd()} />
      {/* <div>{error}</div> */}
    </StyledProductList>
  );
}

export default ProductAddContainer;

const StyledProductList = styled.div`
  color: pink;
`;
