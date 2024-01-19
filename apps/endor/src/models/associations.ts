import { Colors } from './Colors';
import { ProductImageTypes } from './ProductImageTypes';
import { ProductImages } from './ProductImages';
import { ProductInformation } from './ProductInformation';
import { ProductInventory } from './ProductInventory';
import { Products } from './Products';
import { Sizes } from './Sizes';

export function defineAssociations() {
  // ProductInformation associations
  Products.hasOne(ProductInformation, { foreignKey: 'id' });
  ProductInformation.belongsTo(Products, {
    foreignKey: 'id',
  });

  // Products associations
  Products.hasMany(ProductImages, { foreignKey: 'productId' });
  ProductImages.belongsTo(Products, { foreignKey: 'productId' });

  // ProductImages associations
  ProductImages.belongsTo(ProductImageTypes, {
    foreignKey: 'productImageTypeId',
  });
  ProductImageTypes.hasMany(ProductImages, {
    foreignKey: 'productImageTypeId',
  });

  // ProductInventory associations
  ProductInventory.belongsTo(Products, { foreignKey: 'productId' });
  Products.hasMany(ProductInventory, { foreignKey: 'productId' });

  ProductInventory.belongsTo(Sizes, { foreignKey: 'sizeId' });
  Sizes.hasMany(ProductInventory, { foreignKey: 'sizeId' });

  ProductInventory.belongsTo(Colors, { foreignKey: 'colorId' });
  Colors.hasMany(ProductInventory, { foreignKey: 'colorId' });
}
