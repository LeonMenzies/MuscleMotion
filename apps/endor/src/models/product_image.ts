import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';
import { Product } from './product';
import { ProductImageType } from './product_image_type';

export const ProductImage = sequelize.define('ProductImage', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  productId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  productImageTypeId: {
    type: DataTypes.INTEGER,
  },
  imageUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export const associateProductImage = () => {
  ProductImage.belongsTo(Product, {
    foreignKey: 'productId',
  });
  ProductImage.belongsTo(ProductImageType, {
    foreignKey: 'productImageTypeId',
  });
};
