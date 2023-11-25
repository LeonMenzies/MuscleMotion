import styled from 'styled-components';
import Text from '../../components/input/Text';
import { useEffect, useState } from 'react';

const StyledProductCategoryAddModel = styled.dialog`
  background-color: red;
  width: 40rem;
`;

interface TProductCategoryAddModel {
  open: boolean;
  onClose: Function;
}

const ProductCategoryAddModel = ({
  open,
  onClose,
}: TProductCategoryAddModel) => {
  const [productCategory, serProductCategory] = useState('');
  const [productCategories, serProductCategories] = useState<any>([]);

  const getCategories = () => {
    // getProductCategories().then((val) => {
    //   const tmp: Array<any> = [];
    //   val.forEach((v) => tmp.push({ label: v.data().label, id: v.id }));
    //   serProductCategories(tmp);
    // });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    // addProductCategory(productCategory);
    getCategories();
  };

  return (
    <StyledProductCategoryAddModel open={open}>
      <div onClick={() => onClose()}>X</div>

      <form onSubmit={handleSubmit}>
        <Text
          title={'Category'}
          type={'category'}
          placeholder={'Enter category'}
          value={productCategory}
          id={'category'}
          required={true}
          onChange={(e) => serProductCategory(e.target.value)}
        />

        <button type="submit">Add Category</button>
      </form>

      <div>
        Categories
        {productCategories.map((val: any) => (
          <div>{val.label}</div>
        ))}
      </div>
    </StyledProductCategoryAddModel>
  );
};

export default ProductCategoryAddModel;
