import { useFetchApi } from '@musclemotion/hooks';
import { ProductResponseT } from '@musclemotion/types';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ProductListDisplay } from './product_list_display';

/* eslint-disable-next-line */
export interface ProductsListContainerProps {}

export function ProductsListContainer(props: ProductsListContainerProps) {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { subCategoryId } = useParams<{ subCategoryId: string }>();

  const [fetchProductsResponse, , fetchProducts] =
    useFetchApi<ProductResponseT[]>('/product/products');

  useEffect(() => {
    const params: {
      categoryId: typeof categoryId;
      subCategoryId?: typeof subCategoryId;
    } = {
      categoryId: categoryId,
    };

    if (subCategoryId !== '0') {
      params.subCategoryId = subCategoryId;
    }
    fetchProducts(params);
  }, [categoryId, fetchProducts, subCategoryId]);

  return (
    <StyledProductsListContainer>
      {' '}
      <ProductListDisplay productList={fetchProductsResponse.data} />
    </StyledProductsListContainer>
  );
}

export default ProductsListContainer;

const StyledProductsListContainer = styled.div`
  color: black;
`;
