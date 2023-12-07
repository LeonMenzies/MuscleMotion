import express from 'express';
import { router as userRouter } from '../controllers/UserController';
import { router as colorRouter } from '../controllers/ColorsController';
import { router as sizesRouter } from '../controllers/SizesController';
import { router as productsRouter } from '../controllers/ProductsController';
import { router as helperRouter } from '../controllers/HelperRouter';

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/colors', colorRouter);
apiRouter.use('/sizes', sizesRouter);
apiRouter.use('/product', productsRouter);
apiRouter.use('/helper', helperRouter);

export { apiRouter };
