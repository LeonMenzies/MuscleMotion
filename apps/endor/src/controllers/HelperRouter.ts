import express from 'express';
import { addProductCategory } from '../cron/add_product_category';
import { sendSuccessResponse } from '../helpers/ResponseHandler';
import { errorHandler } from '../helpers/ErrorHandler';

export const router = express.Router();

router.get('/sync-product-categories', async (req, res) => {
  addProductCategory()
    .then(() =>
      sendSuccessResponse({
        res,
      })
    )
    .catch((error) => {
      errorHandler(error, req, res);
    });
});
