import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  roles: {
    type: DataTypes.ENUM,
    values: ['user', 'admin', 'deleted'],
    defaultValue: 'user',
  },
  passwordHash: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
