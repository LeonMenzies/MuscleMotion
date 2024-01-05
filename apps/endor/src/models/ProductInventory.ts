import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const ProductInventory = sequelize.define('ProductInventory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subCategoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sizeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  colorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
