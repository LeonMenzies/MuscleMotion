import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const Inventory = sequelize.define('Inventory', {
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
  sizeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Sizes',
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
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
