import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './services/sequelize';
import { apiRouter } from './routes/routes';
import './cron/cron_runner';

import cookieParser from 'cookie-parser';
import { associateProductCategory } from './models/product_category';
import { associateColor } from './models/color';
import { associateProduct } from './models/product';
import { associateProductImage } from './models/product_image';
import { associateProductImageType } from './models/product_image_type';
import { associateProductInformation } from './models/product_information';
import { associateProductInventory } from './models/product_inventory';
import { associateProductSubCategory } from './models/product_sub_category';
import { associateSize } from './models/size';
import { associateUser } from './models/user';
const allowedOrigins = ['http://localhost:4000', 'http://localhost:5000'];
const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());

app.use('/api', apiRouter);

sequelize
  .sync({ alter: true })
  // .sync({ force: true })
  .catch((err) => {
    console.log('Error', err);
  });

associateColor();
associateProductCategory();
associateProductImageType();
associateProductImage();
associateProductInformation();
associateProductInventory();
associateProductSubCategory();
associateProduct();
associateSize();
associateUser();

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});

server.on('error', console.error);
