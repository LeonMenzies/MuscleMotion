import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';
import { ProductImages } from './ProductImages';

export const ProductImageTypes = sequelize.define('ProductImageTypes', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  imageType: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

ProductImageTypes.hasOne(ProductImages, { foreignKey: 'imageTypeId' });
