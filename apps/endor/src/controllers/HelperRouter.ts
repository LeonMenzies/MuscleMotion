import express, { Request, Response } from 'express';
import { addProductCategory } from '../cron/add_product_category';
import { addProductSubCategory } from '../cron/add_product_sub_category';
import { sendSuccessResponse } from '../helpers/ResponseHandler';
import { errorHandler } from '../helpers/ErrorHandler';

export const router = express.Router();

router.get('/sync-product-categories', async (req: Request, res: Response) => {
  addProductCategory()
    .then(() => sendSuccessResponse(res))
    .catch((error) => {
      errorHandler(error, req, res);
    });
});

router.get(
  '/sync-product-sub-categories',
  async (req: Request, res: Response) => {
    addProductSubCategory()
      .then(() => sendSuccessResponse(res))
      .catch((error) => {
        errorHandler(error, req, res);
      });
  }
);
