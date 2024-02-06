import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';
import { Product } from './product';
import { ProductSubCategory } from './product_sub_category';

export const ProductCategory = sequelize.define('ProductCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const associateProductCategory = () => {
  ProductCategory.hasOne(Product, {
    foreignKey: 'categoryId',
  });
  ProductCategory.hasOne(ProductSubCategory, {
    foreignKey: 'categoryId',
  });
};
