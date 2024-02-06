import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';
import { ProductInformation } from './product_information';
import { ProductCategory } from './product_category';
import { ProductSubCategory } from './product_sub_category';
import { ProductImage } from './product_image';
import { ProductInventory } from './product_inventory';

export const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productInformationId: {
    type: DataTypes.INTEGER,
  },
  categoryId: {
    type: DataTypes.INTEGER,
  },
  subCategoryId: {
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

export const associateProduct = () => {
  Product.belongsTo(ProductCategory, {
    foreignKey: 'productId',
  });

  Product.belongsTo(ProductSubCategory, {
    foreignKey: 'subCategoryId',
  });

  Product.belongsTo(ProductInformation, {
    foreignKey: 'productInformationId',
  });

  Product.hasMany(ProductImage, {
    foreignKey: 'productId',
  });

  Product.hasMany(ProductInventory, {
    foreignKey: 'productId',
  });
};
