import styled from 'styled-components';
import { useFetchApi } from '@musclemotion/hooks';
import { Product } from '@musclemotion/types';
import { ProductListDisplay } from './ProductListDisplay';
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { Button } from '@musclemotion/components';

export interface ProductListContainerProps {}

export function ProductListContainer(props: ProductListContainerProps) {
  const [fetchProductsResponse, fetchProductsLoading, fetchProducts] =
    useFetchApi<Product[]>('/product');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <StyledProductList>
      <div>
        <Button text={'Add+'} onClick={() => navigate('/product-add')} />
      </div>

      <ProductListDisplay productList={fetchProductsResponse.data} />
    </StyledProductList>
  );
}

export default ProductListContainer;

const StyledProductList = styled.div`
  display: flex;
  flex-direction: column;
`;
