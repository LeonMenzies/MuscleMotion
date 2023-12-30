import styled from 'styled-components';
import { Text, DropDown, Button } from '@musclemotion/components';

import {
  ProductCategoriesResponseT,
  ProductSubCategoriesResponseT,
  ProductT,
} from '@musclemotion/types';

interface ProductAddProps {
  categories: ProductCategoriesResponseT[];
  product: ProductT;
  handleFieldChange: (fieldName: keyof ProductT, value: string | Blob) => void;
}

export function ProductAdd(props: ProductAddProps) {
  const { categories, product, handleFieldChange } = props;

  const mappedCategories = categories.map(
    (category: ProductCategoriesResponseT) => ({
      label: category.displayName,
      id: category.id,
    })
  );

  const findParentCategory = (id: number) => {
    const parentCategory = categories.find(
      (category: ProductCategoriesResponseT) => category.id === Number(id)
    );

    if (parentCategory) {
      return parentCategory.ProductSubCategories.map(
        (subCategory: ProductSubCategoriesResponseT) => ({
          label: subCategory.displayName,
          id: subCategory.id,
        })
      );
    } else {
      return [];
    }
  };

  return (
    <StyledProductAdd>
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
      <DropDown
        onChange={(event) =>
          handleFieldChange('categoryId', event.target.value)
        }
        value={product.categoryId}
        options={mappedCategories}
      />
      <DropDown
        onChange={(event) =>
          handleFieldChange('subCategoryId', event.target.value)
        }
        value={product.subCategoryId}
        options={findParentCategory(product.categoryId)}
      />

      {/* <ProductDisplay onClick={() => {}} product={product} /> */}
    </StyledProductAdd>
  );
}

export default ProductAdd;

const StyledProductAdd = styled.div`
  width: 100%;
  background-color: green;
`;
