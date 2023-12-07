import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const ProductSubCategories = sequelize.define('ProductSubCategories', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  categoryID: {
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
