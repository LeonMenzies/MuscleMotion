import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const ProductStock = sequelize.define('ProductStock', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
