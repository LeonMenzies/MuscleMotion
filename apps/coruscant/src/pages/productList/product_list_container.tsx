import styled from 'styled-components';
import { useFetchApi } from '@musclemotion/hooks';
import { ProductResponseT, ProductT } from '@musclemotion/types';
import { ProductListDisplay } from './product_list_display';
import { useNavigate } from 'react-router-dom';

import { useEffect } from 'react';
import { Button } from '@musclemotion/components';
import { useSetRecoilState } from 'recoil';
import { defaultProduct, productAtom } from '../../recoil/product';

export interface ProductListContainerProps {}

export function ProductListContainer(props: ProductListContainerProps) {
  const [fetchProductsResponse, , fetchProducts] =
    useFetchApi<ProductResponseT[]>('/product/products');
  const navigate = useNavigate();
  const setProduct = useSetRecoilState<ProductT>(productAtom);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <StyledProductList>
      <div>
        <Button
          text={'Add+'}
          onClick={() => {
            setProduct(defaultProduct);
            navigate('/product-add');
          }}
        />
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
