import express from 'express';
import { router as userRouter } from '../controllers/user_controller';
import { router as colorRouter } from '../controllers/color_controller';
import { router as sizesRouter } from '../controllers/size_controller';
import { router as productsRouter } from '../controllers/product_controller';
import { router as fileRouter } from '../controllers/file_controller';
import { router as defaultRouter } from '../controllers/default_controller';

const apiRouter = express.Router();

apiRouter.use('', defaultRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/color', colorRouter);
apiRouter.use('/size', sizesRouter);
apiRouter.use('/product', productsRouter);
apiRouter.use('/file', fileRouter);

export { apiRouter };
