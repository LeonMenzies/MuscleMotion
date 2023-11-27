import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { sequelize } from './services/sequelize';
import { apiRouter } from './routes/routes';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:4000' }));

app.use('/api', apiRouter);

sequelize
  .sync({ alter: true })
  .then(() => {
    console.log('Database successfully connected');
  })
  .catch((err) => {
    console.log('Error', err);
  });

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/api`);
});
server.on('error', console.error);
