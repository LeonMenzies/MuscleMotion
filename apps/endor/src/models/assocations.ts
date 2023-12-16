import { ProductImageTypes } from './ProductImageTypes';
import { ProductImages } from './ProductImages';
import { Products } from './Products';

export function defineAssociations() {
  ProductImages.belongsTo(Products, { foreignKey: 'productId' });
  Products.hasMany(ProductImages, { foreignKey: 'productId' });

  ProductImages.belongsTo(ProductImageTypes, {
    foreignKey: 'productImageTypeId',
  });
  ProductImageTypes.hasMany(ProductImages, {
    foreignKey: 'productImageTypeId',
  });
}
