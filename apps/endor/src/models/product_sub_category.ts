import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';
import { Product } from './product';
import { ProductCategory } from './product_category';

export const ProductSubCategory = sequelize.define('ProductSubCategory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
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

export const associateProductSubCategory = () => {
  ProductSubCategory.hasOne(Product, {
    foreignKey: 'subCategoryId',
  });
  ProductSubCategory.belongsTo(ProductCategory, {
    foreignKey: 'categoryId',
  });
};
