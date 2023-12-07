import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const ProductSubCategories = sequelize.define('ProductSubCategories', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  categoryID: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
