import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const ProductImage = sequelize.define('ProductImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productImageTypeId: {
    type: DataTypes.INTEGER,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
