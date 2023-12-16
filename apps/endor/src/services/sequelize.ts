import { Sequelize } from 'sequelize';
import { config } from '../config';

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: console.log,
  }
);
