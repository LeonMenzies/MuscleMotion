import styled from 'styled-components';
import { ProductDisplay } from '@musclemotion/components';
import { ProductResponseT, ProductT } from '@musclemotion/types';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { productAtom } from '../../recoil/Product';

export interface ProductListDisplayProps {
  productList: ProductResponseT[] | undefined;
}

export function ProductListDisplay(props: ProductListDisplayProps) {
  const { productList } = props;
  const navigate = useNavigate();
  const setProduct = useSetRecoilState<ProductT>(productAtom);

  return (
    <StyledProductList>
      {productList &&
        productList.map((product: ProductResponseT, index: number) => (
          <ProductDisplay
            product={product}
            onClick={() => {
              setProduct(product);
              navigate('/product-add');
            }}
            key={index}
          />
        ))}
    </StyledProductList>
  );
}

const StyledProductList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
`;
