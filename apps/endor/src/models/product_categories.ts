import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';
import { ProductSubCategories } from './product_sub_categories';

export const ProductCategories = sequelize.define('ProductCategories', {
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

ProductCategories.hasMany(ProductSubCategories, { foreignKey: 'categoryId' });
