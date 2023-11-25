import express from 'express';
import { router as userRouter } from '../controllers/UserController';
import { router as colorRouter } from '../controllers/ColorsController';
import { router as sizesRouter } from '../controllers/SizesController';

const apiRouter = express.Router();

apiRouter.use('/users', userRouter);
apiRouter.use('/colors', colorRouter);
apiRouter.use('/sizes', sizesRouter);

export { apiRouter };