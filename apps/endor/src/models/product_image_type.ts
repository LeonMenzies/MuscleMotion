import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const ProductImageType = sequelize.define('ProductImageType', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  imageType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
