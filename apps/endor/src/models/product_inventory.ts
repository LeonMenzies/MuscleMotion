import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';
import { Product } from './product';
import { Size } from './size';
import { Color } from './color';

export const ProductInventory = sequelize.define('ProductInventory', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  sizeId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  colorId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});
export const associateProductInventory = () => {
  ProductInventory.belongsTo(Product, {
    foreignKey: 'productId',
  });
  ProductInventory.hasOne(Size, {
    foreignKey: 'sizeId',
  });
  ProductInventory.hasOne(Color, {
    foreignKey: 'colorId',
  });
};
