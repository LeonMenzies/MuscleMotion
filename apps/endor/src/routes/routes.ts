import express from 'express';
import { router as userRouter } from '../controllers/UserController';
import { router as colorRouter } from '../controllers/ColorsController';
import { router as sizesRouter } from '../controllers/SizesController';
import { router as productsRouter } from '../controllers/ProductsController';
import { router as helperRouter } from '../controllers/HelperRouter';
import { router as fileRouter } from '../controllers/FileController';
import { router as defaultRouter } from '../controllers/DefaultController';

const apiRouter = express.Router();

apiRouter.use('', defaultRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/color', colorRouter);
apiRouter.use('/size', sizesRouter);
apiRouter.use('/product', productsRouter);
apiRouter.use('/helper', helperRouter);
apiRouter.use('/file', fileRouter);

export { apiRouter };
