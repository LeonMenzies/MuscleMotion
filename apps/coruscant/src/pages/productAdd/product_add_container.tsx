import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { useFetchApi, usePostApi } from '@musclemotion/hooks';
import ProductAddInformation from './product_add_information';
import ProductAddImages from './product_add_images';
import {
  ProductCategoriesResponseT,
  ProductInformationT,
  ProductStagesItem,
  ProductT,
  ProductImagesT,
} from '@musclemotion/types';
import { useRecoilState } from 'recoil';
import { productAtom } from '../../recoil/product';
import ProductAdd from './product_add';
import { ProgressComponent } from './product_add_progress';
import { Button } from '@musclemotion/components';
import ProductAddPreview from './product_add_preview';

export interface ProductAddContainerProps {}

export function ProductAddContainer(props: ProductAddContainerProps) {
  const [postProductAddResponse, , postProductAdd] = usePostApi<any, any>(
    '/product/create'
  );
  const [, , postProductImage] = usePostApi<any, any>('/file/image');
  const [postProductEditResponse, , postProductEdit] = usePostApi<any, any>(
    '/product/update'
  );
  const [categoriesResponse, , fetchCategories] = useFetchApi<
    ProductCategoriesResponseT[]
  >('/product/categories');

  const [product, setProduct] = useRecoilState<ProductT>(productAtom);

  const [productInformation, setProductInformation] =
    useState<ProductInformationT>({
      description: '',
      sizes: [],
      colors: [],
    });

  const [pageIndex, setPageIndex] = useState<number>(0);
  const [productImages, setProductImages] = useState<ProductImagesT>({});

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

  useEffect(() => {
    if (postProductAddResponse.success && postProductAddResponse.data) {
      Object.entries(productImages).forEach(([imageType, blob]) => {
        if (blob !== null) {
          const reader = new FileReader();
          reader.onloadend = function () {
            const base64data = reader.result;
            postProductImage({
              productId: postProductAddResponse.data.productId,
              imageType: imageType,
              image: base64data,
            });
          };
          reader.readAsDataURL(blob);
        }
      });
    }
  }, [postProductAddResponse, postProductImage, productImages]);

  useEffect(() => {
    if (postProductEditResponse.success && postProductEditResponse.data) {
      Object.entries(productImages).forEach(([imageType, blob]) => {
        if (blob !== null) {
          const reader = new FileReader();
          reader.onloadend = function () {
            const base64data = reader.result;
            postProductImage({
              productId: postProductEditResponse.data.productId,
              imageType: imageType,
              image: base64data,
            });
          };
          reader.readAsDataURL(blob);
        }
      });
    }
  }, [postProductEditResponse, postProductImage, productImages]);

  const handleAdd = () => {
    if (product.id) {
      postProductEdit({ ...product, ...productInformation });
    } else {
      postProductAdd({ ...product, ...productInformation });
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

  const handleInformationFieldChange = (
    fieldName: keyof typeof productInformation,
    value: string | Blob | number[]
  ) => {
    setProductInformation({
      ...productInformation,
      [fieldName]: value,
    });
  };

  const handleImageFieldChange = (imageType: string, value: Blob | null) => {
    setProductImages((prevImages) => {
      if (value instanceof Blob) {
        // Add or update the image
        return { ...prevImages, [imageType]: value };
      } else {
        // Remove the image
        const { [imageType]: _, ...newImages } = prevImages;
        return newImages;
      }
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
      component: (
        <ProductAddImages handleImageFieldChange={handleImageFieldChange} />
      ),
      name: 'images',
      displayName: 'Images',
    },
    {
      component: (
        <ProductAddInformation
          handleInformationFieldChange={handleInformationFieldChange}
          productInformation={productInformation}
        />
      ),
      name: 'information',
      displayName: 'Information',
    },
    {
      component: (
        <ProductAddPreview
          productImages={productImages}
          product={product}
          productInformation={productInformation}
        />
      ),
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
