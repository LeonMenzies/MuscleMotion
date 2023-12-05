import { Product } from '@musclemotion/types';
import styled from 'styled-components';

export interface ProductDisplayProps {
  product: Product;
  onClick: () => void;
}

export function ProductDisplay(props: ProductDisplayProps) {
  const { product, onClick } = props;
  return (
    <StyledProductDisplay onClick={onClick}>
      <img className={'product-image'} src={''} alt={product.name} />
      <h1>{product.name}</h1>
      <h2>{product.price}</h2>
    </StyledProductDisplay>
  );
}

export default ProductDisplay;

const StyledProductDisplay = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background-color: #fff;
  max-width: 300px;
  margin: 20px;
  overflow: hidden;

  .product-image {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 10px;
  }
`;
