import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';
import { Products } from './Products';

export const ProductInformation = sequelize.define('productInformation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
});

ProductInformation.belongsToMany(Products, { through: 'productInformationID' });
