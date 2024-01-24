import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const ProductSizes = sequelize.define('ProductSizes', {
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Products',
      key: 'id',
    },
  },
  sizeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Sizes',
      key: 'id',
    },
  },
});
