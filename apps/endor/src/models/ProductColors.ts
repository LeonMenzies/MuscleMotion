import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const ProductColors = sequelize.define('ProductColors', {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id',
    },
  },
  colorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Colors',
      key: 'id',
    },
  },
});
