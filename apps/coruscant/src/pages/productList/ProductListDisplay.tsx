import styled from 'styled-components';
import { ProductDisplay } from '@musclemotion/components';
import { ProductT } from '@musclemotion/types';
import { useNavigate } from 'react-router-dom';

export interface ProductListDisplayProps {
  productList: ProductT[] | undefined;
}

export function ProductListDisplay(props: ProductListDisplayProps) {
  const { productList } = props;
  const navigate = useNavigate();

  return (
    <StyledProductList>
      {productList &&
        productList.map((product: ProductT, index: number) => (
          <ProductDisplay
            product={product}
            onClick={() => navigate('/product-add')}
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
