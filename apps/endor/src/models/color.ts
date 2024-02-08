import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';
import { ProductInventory } from './product_inventory';

export const Color = sequelize.define('Color', {
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
  colorHex: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const associateColor = () => {
  Color.hasOne(ProductInventory, {
    foreignKey: 'colorId',
  });
};
