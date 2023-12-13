import styled from 'styled-components';
import { Text, Button, Image, ProductDisplay } from '@musclemotion/components';
import { useState } from 'react';
import { usePostApi } from '@musclemotion/hooks';
import ProductAddImageCarousel from './ProductAddImageCarousel';

export interface ProductAddContainerProps {}

export function ProductAddContainer(props: ProductAddContainerProps) {
  const [postProductsResponse, postProductsLoading, postProducts] = usePostApi<
    any,
    any
  >('/api/product');

  const [product, setProduct] = useState<any>({
    name: '',
    price: 0,
    displayImage1: new Blob(),
    displayImage2: new Blob(),
  });

  const [productImages, setProductImages] = useState<any>([]);

  const handleFieldChange = (
    fieldName: keyof typeof product,
    value: string | Blob
  ) => {
    setProduct({
      ...product,
      [fieldName]: value,
    });
  };

  const handleAdd = async () => {
    postProducts(product);
  };

  const handleImageChange = (file: Blob) => {
    const reader = new FileReader();
    reader.onload = () => {
      const imageObject = {
        file: file,
        url: reader.result as string,
      };
      setProductImages([...productImages, imageObject]);
    };
    reader.readAsDataURL(file);
  };

  return (
    <StyledProductList>
      <ProductAddImageCarousel images={productImages} />
      <Image
        onImageChange={handleImageChange}
        buttonText="Choose Image carousel"
      />

      <Image
        onImageChange={(file) => handleFieldChange('displayImage1', file)}
        buttonText="Choose Image 1"
      />
      <Image
        onImageChange={(file) => handleFieldChange('displayImage2', file)}
        buttonText="Choose Image 2"
      />

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
      <ProductDisplay onClick={() => {}} product={product} />

      <div>{postProductsResponse.errorMessage}</div>
    </StyledProductList>
  );
}

export default ProductAddContainer;

const StyledProductList = styled.div`
  padding: 40px;
  display: flex;
`;
