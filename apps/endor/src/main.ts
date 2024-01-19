import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './services/sequelize';
import { apiRouter } from './routes/routes';
import './cron/cron_runner';

import cookieParser from 'cookie-parser';
import { defineAssociations } from './models/associations';
const allowedOrigins = ['http://localhost:4000', 'http://localhost:5000'];
const app = express();

app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(cookieParser());

app.use('/api', apiRouter);

sequelize
  .sync({ alter: true })
  .then(() => {
    defineAssociations();
  })
  .catch((err) => {
    console.log('Error', err);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
