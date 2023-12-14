import styled from 'styled-components';
import { useState } from 'react';
import { usePostApi } from '@musclemotion/hooks';
import ProductAddImageCarousel from './ProductAddImageCarousel';
import ProductAddInformation from './ProductAddInformation';
import ProductAddImages from './ProductAddImages';

export interface ProductAddContainerProps {}

export function ProductAddContainer(props: ProductAddContainerProps) {
  const [postProductsResponse, postProductsLoading, postProducts] = usePostApi<
    any,
    any
  >('/product');

  const [productImages, setProductImages] = useState<any>([]);

  // const handleAdd = async () => {
  //   postProducts(product);
  // };

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
      <ProductAddImages />
      <ProductAddInformation />
      {/* <ProductAddImageCarousel images={productImages} /> */}
      {/* <Image
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
      /> */}
    </StyledProductList>
  );
}

export default ProductAddContainer;

const StyledProductList = styled.div`
  padding: 40px;
  display: flex;
`;
