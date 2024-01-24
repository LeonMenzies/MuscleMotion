import express, { Request, Response } from 'express';
import { addProductCategory } from '../cron/add_product_category';
import { sendSuccessResponse } from '../helpers/response_handler';
import { errorHandler } from '../helpers/error_handler';

export const router = express.Router();

router.get('/sync-product-categories', async (req: Request, res: Response) => {
  addProductCategory()
    .then(() => sendSuccessResponse(res))
    .catch((error) => {
      errorHandler(error, req, res);
    });
});
