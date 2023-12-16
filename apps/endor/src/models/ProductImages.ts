import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const ProductImages = sequelize.define('ProductImages', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id',
    },
  },
  imageUrl: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Colors',
      key: 'id',
    },
  },
});
