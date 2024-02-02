import { Color } from './color';
import { ProductCategory } from './product_category';
import { ProductImageType } from './product_image_type';
import { ProductImage } from './product_image';
import { ProductInformation } from './product_information';
import { ProductInventory } from './product_inventory';
import { ProductSubCategory } from './product_sub_category';
import { Product } from './product';
import { Size } from './size';

export function defineAssociations() {
  // Product associations
  Product.hasOne(ProductInformation, { foreignKey: 'id' });
  ProductInformation.belongsTo(Product, {
    foreignKey: 'id',
  });
  Product.hasOne(ProductCategory, { foreignKey: 'id' });
  ProductCategory.belongsTo(Product, {
    foreignKey: 'id',
  });
  Product.hasOne(ProductSubCategory, { foreignKey: 'id' });
  ProductSubCategory.belongsTo(Product, {
    foreignKey: 'id',
  });
  Product.hasMany(ProductInventory, { foreignKey: 'productId' });
  ProductInventory.belongsTo(Product, { foreignKey: 'productId' });

  // ProductImages associations
  Product.hasMany(ProductImage, { foreignKey: 'productId' });
  ProductImage.belongsTo(Product, { foreignKey: 'productId' });
  ProductImageType.hasOne(ProductImage, {
    foreignKey: 'productImageTypeId',
  });
  ProductImage.belongsTo(ProductImageType, {
    foreignKey: 'productImageTypeId',
  });

  // ProductInventory associations
  Size.hasOne(ProductInventory, { foreignKey: 'id' });
  ProductInventory.belongsTo(Size, { foreignKey: 'id' });

  Color.hasOne(ProductInventory, { foreignKey: 'id' });
  ProductInventory.belongsTo(Color, { foreignKey: 'id' });
}
