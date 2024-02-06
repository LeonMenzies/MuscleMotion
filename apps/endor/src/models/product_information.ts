import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';
import { Product } from './product';

export const ProductInformation = sequelize.define('ProductInformation', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
  },
});

export const associateProductInformation = () => {
  ProductInformation.hasOne(Product, {
    foreignKey: 'productInformationId',
  });
};
