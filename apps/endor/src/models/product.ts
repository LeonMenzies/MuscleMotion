import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

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
