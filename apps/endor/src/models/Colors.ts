import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const Colors = sequelize.define('Colors', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  colorName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
