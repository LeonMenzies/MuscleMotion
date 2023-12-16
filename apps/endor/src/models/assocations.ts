import { ProductImageTypes } from './ProductImageTypes';
import { ProductImages } from './ProductImages';
import { ProductInformation } from './ProductInformation';
import { Products } from './Products';

export function defineAssociations() {
  Products.hasOne(ProductInformation, { foreignKey: 'id' });
  ProductInformation.belongsTo(Products, {
    foreignKey: 'productInformationId',
  });

  ProductImages.belongsTo(Products, { foreignKey: 'productId' });
  Products.hasMany(ProductImages, { foreignKey: 'productId' });

  ProductImages.belongsTo(ProductImageTypes, {
    foreignKey: 'productImageTypeId',
  });
  ProductImageTypes.hasMany(ProductImages, {
    foreignKey: 'productImageTypeId',
  });
}
