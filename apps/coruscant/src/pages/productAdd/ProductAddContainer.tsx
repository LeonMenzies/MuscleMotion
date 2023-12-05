import styled from 'styled-components';
import { Text, Button, Image } from '@musclemotion/components';
import { ChangeEvent, useState } from 'react';
import { usePostApi } from '@musclemotion/hooks';
import { Product } from '@musclemotion/types';
import ProductAddImageCarousel from './ProductAddImageCarousel';

export interface ProductAddContainerProps {}

export function ProductAddContainer(props: ProductAddContainerProps) {
  const [postProductsResponse, postProductsLoading, postProducts] =
    usePostApi<Product>('/api/product');

  const images = [
    'https://via.placeholder.com/600x400/ff0000',
    'https://via.placeholder.com/600x400/00ff00',
    'https://via.placeholder.com/600x400/0000ff',
  ];

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

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];

    if (selectedFile) {
      // Perform actions with the selected file, like uploading to server or displaying preview
      console.log('Selected file:', selectedFile);
    }
  };

  return (
    <StyledProductList>
      <ProductAddImageCarousel images={images} />
      {/* <Image onChange={handleImageChange} width="200px" height="150px" /> */}
      <div>
        <Button text={'Add'} onClick={() => handleAdd()} />

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
      </div>

      {/* <div>{error}</div> */}
    </StyledProductList>
  );
}

export default ProductAddContainer;

const StyledProductList = styled.div`
  padding: 40px;
  display: flex;
`;
