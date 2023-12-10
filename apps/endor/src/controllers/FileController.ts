import express, { Request, Response } from 'express';
import { sendSuccessResponse } from '../helpers/ResponseHandler';
import { errorHandler } from '../helpers/ErrorHandler';
import { RequestHelper } from '../helpers/RequestHelper';
import { ProductService } from '../services/product_service';

export const router = express.Router();

router.post('/image', async (req: Request, res: Response) => {
  try {
    const helper = new RequestHelper(req);
    const image = helper.getRequiredParam('image');
    const imageName = helper.getRequiredParam('imageName');
    const productID = helper.getRequiredParam('productID');

    const productService = new ProductService();
    productService
      .addImage(productID, image, imageName)
      .then(() => sendSuccessResponse(res));
  } catch (error) {
    errorHandler(error, req, res);
  }
});
