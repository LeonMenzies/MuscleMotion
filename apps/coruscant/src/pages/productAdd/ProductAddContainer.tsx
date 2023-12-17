import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useFetchApi, usePostApi } from '@musclemotion/hooks';
import ProductAddInformation from './ProductAddInformation';
import ProductAddImages from './ProductAddImages';
import { ProductCategoriesResponseT, ProductT } from '@musclemotion/types';
import { useRecoilState } from 'recoil';
import { productAtom } from '../../recoil/Product';

export interface ProductAddContainerProps {}

export function ProductAddContainer(props: ProductAddContainerProps) {
  const [postProductAddResponse, postProductAddLoading, postProductAdd] =
    usePostApi<any, any>('/product/create');
  const [postProductEditResponse, postProductEditLoading, postProductEdit] =
    usePostApi<any, any>('/product/update');

  const [categoriesResponse, , fetchCategories] = useFetchApi<
    ProductCategoriesResponseT[]
  >('/product/categories');

  const [product, setProduct] = useRecoilState<ProductT>(productAtom);

  // const [productImages, setProductImages] = useState<any>([]);
  const [categories, setCategories] = useState<ProductCategoriesResponseT[]>([
    {
      id: 0,
      name: '',
      displayName: 'Select a category',
      ProductSubCategories: [],
    },
  ]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (categoriesResponse.success && categoriesResponse.data) {
      setCategories(categoriesResponse.data);
    }
  }, [categoriesResponse]);

  const handleAdd = () => {
    if (product.id) {
      postProductEdit(product);
    } else {
      postProductAdd(product);
    }
  };

  return (
    <StyledProductList>
      <ProductAddImages />
      <ProductAddInformation
        categories={categories}
        handleAdd={handleAdd}
        product={product}
        setProduct={setProduct}
      />
    </StyledProductList>
  );
}

export default ProductAddContainer;

const StyledProductList = styled.div`
  padding: 40px;
  display: flex;
`;
