import { Colors } from './colors';
import { ProductImageTypes } from './product_image_types';
import { ProductImages } from './product_images';
import { ProductInformation } from './product_information';
import { ProductInventory } from './product_inventory';
import { Products } from './products';
import { Sizes } from './sizes';

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
