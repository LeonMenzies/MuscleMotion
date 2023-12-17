import styled from 'styled-components';
import { Text, DropDown, Button } from '@musclemotion/components';

import {
  ProductCategoriesResponseT,
  ProductSubCategoriesResponseT,
  ProductT,
} from '@musclemotion/types';

interface ProductAddInformationProps {
  categories: ProductCategoriesResponseT[];
  handleAdd: () => void;
  product: ProductT;
  setProduct: (product: ProductT) => void;
}

export function ProductInformation(props: ProductAddInformationProps) {
  const { categories, handleAdd, product, setProduct } = props;

  const handleFieldChange = (
    fieldName: keyof typeof product,
    value: string | Blob
  ) => {
    setProduct({
      ...product,
      [fieldName]: value,
    });
  };

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
    <StyledProductAddInformation>
      <Button text={'Add'} onClick={handleAdd} />

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
    </StyledProductAddInformation>
  );
}

export default ProductInformation;

const StyledProductAddInformation = styled.div`
  width: 50%;
  background-color: red;
`;
