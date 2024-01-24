import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const ProductImageTypes = sequelize.define('ProductImageTypes', {
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
