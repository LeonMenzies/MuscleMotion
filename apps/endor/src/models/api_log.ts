import { DataTypes } from 'sequelize';
import { sequelize } from '../services/sequelize';

export const ApiLog = sequelize.define('ApiLog', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  level: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  endpoint: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  request: {
    type: DataTypes.JSON,
    allowNull: true,
  },
  response: {
    type: DataTypes.JSON,
    allowNull: true,
  },
});
