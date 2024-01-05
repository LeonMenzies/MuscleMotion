import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const Sizes = sequelize.define('Sizes', {
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
