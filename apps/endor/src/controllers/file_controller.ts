import express, { Request, Response } from 'express';
import { sendSuccessResponse } from '../helpers/response_handler';
import { errorHandler } from '../helpers/error_handler';
import { RequestHelper } from '../helpers/request_helper';
import { ProductService } from '../services/product_service';

export const router = express.Router();

router.post('/image', async (req: Request, res: Response) => {
  try {
    const helper = new RequestHelper(req);
    const image = helper.getRequiredParam('image');
    const imageType = helper.getRequiredParam('imageType');
    const productId = helper.getRequiredParam('productId');

    const productService = new ProductService();
    productService
      .addImage(productId, image, imageType)
      .then((imageID) => sendSuccessResponse(res, imageID));
  } catch (error) {
    errorHandler(error, req, res);
  }
});
