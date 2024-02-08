import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';
import { ProductInventory } from './product_inventory';

export const Size = sequelize.define('Size', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  displayName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const associateSize = () => {
  Size.hasOne(ProductInventory, {
    foreignKey: 'sizeId',
  });
};
