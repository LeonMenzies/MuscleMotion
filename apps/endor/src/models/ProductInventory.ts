import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const ProductInventory = sequelize.define('ProductInventory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  categoryID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  subCategoryID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
