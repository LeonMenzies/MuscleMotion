import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useFetchApi, usePostApi } from '@musclemotion/hooks';
import ProductAddInformation from './ProductAddInformation';
import ProductAddImages from './ProductAddImages';
import {
  ProductCategoriesResponseT,
  ProductStagesItem,
  ProductT,
} from '@musclemotion/types';
import { useRecoilState } from 'recoil';
import { productAtom } from '../../recoil/Product';
import ProductAdd from './ProductAdd';
import { ProgressComponent } from './ProductAddProgress';
import { Button } from '@musclemotion/components';

export interface ProductAddContainerProps {}

export function ProductAddContainer(props: ProductAddContainerProps) {
  const [postProductAddResponse, postProductAddLoading, postProductAdd] =
    usePostApi<any, any>('/product/create');
  const [postProductEditResponse, postProductEditLoading, postProductEdit] =
    usePostApi<any, any>('/product/update');
  const [categoriesResponse, , fetchCategories] = useFetchApi<
    ProductCategoriesResponseT[]
  >('/product/categories');

  const [product, setProduct] = useRecoilState<ProductT>(productAtom);
  const [pageIndex, setPageIndex] = useState<number>(0);

  // const [productImages, setProductImages] = useState<any>([]);
  const [categories, setCategories] = useState<ProductCategoriesResponseT[]>([
    {
      id: 0,
      name: '',
      displayName: 'Select a category',
      ProductSubCategories: [],
    },
  ]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    if (categoriesResponse.success && categoriesResponse.data) {
      setCategories(categoriesResponse.data);
    }
  }, [categoriesResponse]);

  const handleAdd = () => {
    if (product.id) {
      postProductEdit(product);
    } else {
      postProductAdd(product);
    }
  };

  const handleFieldChange = (
    fieldName: keyof typeof product,
    value: string | Blob
  ) => {
    setProduct({
      ...product,
      [fieldName]: value,
    });
  };

  const productAddStages: ProductStagesItem[] = [
    {
      component: (
        <ProductAdd
          categories={categories}
          product={product}
          handleFieldChange={handleFieldChange}
        />
      ),
      name: 'add',
      displayName: 'Add',
    },
    {
      component: <ProductAddImages />,
      name: 'images',
      displayName: 'Images',
    },
    {
      component: (
        <ProductAddInformation
          handleFieldChange={handleFieldChange}
          product={product}
        />
      ),
      name: 'information',
      displayName: 'Information',
    },
    {
      component: <div>Preview</div>,
      name: 'preview',
      displayName: 'Preview',
    },
  ];
  const stageNames = productAddStages.map((stage, index) => ({
    name: stage.name,
    displayName: stage.displayName,
    index: index,
  }));

  return (
    <StyledProductList>
      <div>
        <ProgressComponent
          stages={stageNames}
          pageIndex={pageIndex}
          setPageIndex={setPageIndex}
          percentage={0.5}
        />
        {productAddStages[pageIndex].component}
      </div>
      <ButtonContainer>
        <Button
          text={'Previous'}
          onClick={() => setPageIndex(pageIndex > 1 ? pageIndex - 1 : 0)}
        />

        {pageIndex === productAddStages.length - 1 ? (
          <Button text={product.id ? 'Edit' : 'Add'} onClick={handleAdd} />
        ) : (
          <Button text={'Next'} onClick={() => setPageIndex(pageIndex + 1)} />
        )}
      </ButtonContainer>
    </StyledProductList>
  );
}

export default ProductAddContainer;

const StyledProductList = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
