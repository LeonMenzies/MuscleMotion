import { useState } from 'react';
import ProductCategoryAddModel from './ProductCategoryAddModel';
import Button from '../../components/input/Button';
import ProductAddModel from './ProductAddModel';

const Product = () => {
  const [productModel, setProductModel] = useState(false);
  const [productCategoryModel, setProductCategoryModel] = useState(false);

  return (
    <div>
      <Button
        text={'Add Product Category'}
        onClick={() => setProductCategoryModel(true)}
      />
      <Button text={'Add Product'} onClick={() => setProductModel(true)} />

      <ProductCategoryAddModel
        open={productCategoryModel}
        onClose={() => setProductCategoryModel(false)}
      />
      <ProductAddModel
        open={productModel}
        onClose={() => setProductModel(false)}
      />
    </div>
  );
};

export default Product;
