import styled from 'styled-components';
import { Text, DropDown, ProductDisplay } from '@musclemotion/components';
import { useEffect, useState } from 'react';
import { useFetchApi } from '@musclemotion/hooks';

interface ProductAddInformationProps {}

export function ProductInformation(props: ProductAddInformationProps) {
  const [categoriesResponse, categoriesLoading, fetchCategories] =
    useFetchApi<any>('/product/categories');
  const [product, setProduct] = useState<any>({
    name: '',
    price: 0,
    categoryId: 0,
    subCategoryId: 0,
  });

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (categoriesResponse.success && categoriesResponse.data) {
      setCategories(categoriesResponse.data);
    }
  }, [categoriesResponse]);

  const [categories, setCategories] = useState<any>([
    {
      id: 0,
      name: '',
      displayName: 'Select a category',
      ProductSubCategories: [
        {
          id: 0,
          categoryId: 0,
          name: '',
          displayName: 'Select a sub category',
        },
      ],
    },
  ]);

  const handleFieldChange = (
    fieldName: keyof typeof product,
    value: string | Blob
  ) => {
    setProduct({
      ...product,
      [fieldName]: value,
    });
  };

  const mappedCategories = categories.map((category: any) => ({
    label: category.displayName,
    id: category.id,
  }));

  const findParentCategory = (id: string) => {
    const parentCategory = categories.find(
      (category: any) => category.id == id
    );
    console.log(categories);
    console.log(parentCategory);

    if (parentCategory) {
      return parentCategory.ProductSubCategories.map((subCategory: any) => ({
        label: subCategory.displayName,
        id: subCategory.id,
      }));
    } else {
      return [
        {
          id: 0,
          categoryId: 0,
          name: '',
          displayName: 'Select a sub category',
        },
      ];
    }
  };

  return (
    <StyledProductAddInformation>
      {/* <Button text={'Add'} onClick={() => handleAdd()} /> */}

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

      <ProductDisplay onClick={() => {}} product={product} />
    </StyledProductAddInformation>
  );
}

export default ProductInformation;

const StyledProductAddInformation = styled.div`
  width: 50%;
  background-color: red;
`;
