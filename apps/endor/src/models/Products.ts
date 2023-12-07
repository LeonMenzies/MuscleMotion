import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const Products = sequelize.define('Products', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productInformationID: {
    type: DataTypes.INTEGER,
  },
  categoryID: {
    type: DataTypes.INTEGER,
  },
  subCategoryID: {
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
  thumbnail1: {
    type: DataTypes.STRING,
  },
  thumbnail2: {
    type: DataTypes.STRING,
  },
  carouselImages: {
    type: DataTypes.JSON,
    defaultValue: [],
  },
});
