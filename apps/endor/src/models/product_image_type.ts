import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';
import { ProductImage } from './product_image';

export const ProductImageType = sequelize.define('ProductImageType', {
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

export const associateProductImageType = () => {
  ProductImageType.hasOne(ProductImage, {
    foreignKey: 'productImageTypeId',
  });
};
