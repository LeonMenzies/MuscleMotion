import styled from 'styled-components';
import { Text, Button } from '@musclemotion/components';
import { useEffect, useState } from 'react';
import { useFetchProducts } from '@musclemotion/hooks';

/* eslint-disable-next-line */
export interface ProductListProps {}

export function ProductList(props: ProductListProps) {
  const { products, loading, error, fetchProducts } = useFetchProducts();

  console.log(products);
  console.log(error);

  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
  });

  const handleFieldChange = (
    fieldName: keyof typeof product,
    value: string
  ) => {
    console.log(fieldName);

    setProduct({
      ...product,
      [fieldName]: value,
    });
  };

  const handleAdd = async () => {
    const response = await fetch('http://localhost:3000/api/product/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    console.log(response);

    // if (response.success) {
    //   console.log(response);
    // } else {
    //   setError(response.errorMessage);
    // }

    // if (response.ok) {
    //   console.log('Product added successfully!');
    //   // You might want to reset the form or update the UI in case of success
    // } else {
    //   console.error('Failed to add product:', response.statusText);
    // }
  };

  return (
    <StyledProductList>
      <Text
        title={'name'}
        id={'product-name'}
        type={'text'}
        value={product.name}
        onChange={(event) => handleFieldChange('name', event.target.value)}
      />
      <Text
        title={'description'}
        id={'product-description'}
        type={'text'}
        value={product.description}
        onChange={(event) =>
          handleFieldChange('description', event.target.value)
        }
      />
      <Text
        title={'price'}
        id={'product-price'}
        type={'text'}
        value={product.price}
        onChange={(event) => handleFieldChange('price', event.target.value)}
      />
      <Button text={'Add'} onClick={() => handleAdd()} />
      {/* <div>{error}</div> */}
    </StyledProductList>
  );
}

export default ProductList;

const StyledProductList = styled.div`
  color: pink;
`;
