import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const Products = sequelize.define('Products', {
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
  productInformationID: {
    type: DataTypes.INTEGER,
  },
});
