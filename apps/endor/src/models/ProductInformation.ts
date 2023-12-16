import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const ProductInformation = sequelize.define('ProductInformation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
  },
});
