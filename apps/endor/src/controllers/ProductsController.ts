import express, { Request, Response } from 'express';
import { Products } from '../models/Products';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../helpers/ResponseHandler';
import { RequestHelper } from '../helpers/RequestHelper';
import { errorHandler } from '../helpers/ErrorHandler';
import { APIException } from '../helpers/Exceptions';
import { ProductService } from '../services/product_service';

export const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  try {
    const products = await Products.findAll();

    if (products) {
      sendSuccessResponse(res, products);
    } else {
      throw new APIException('Failed to add Product');
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.post('/create', async (req: Request, res: Response) => {
  try {
    const helper = new RequestHelper(req);
    const name = helper.getRequiredParam('name');
    const price = helper.getRequiredParam('price');
    const categoryID = helper.getRequiredParam('categoryID');
    const subCategoryID = helper.getRequiredParam('subCategoryID');
    const description = helper.getParam('description');

    const productService = new ProductService();
    const productID = await productService.createProduct(
      name,
      price,
      categoryID,
      subCategoryID,
      description
    );

    sendSuccessResponse(res, productID);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Products.findByPk(req.params.id);

    if (product) {
      sendSuccessResponse(res, product);
    } else {
      sendErrorResponse(res, 'Product not found', 404);
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { productName } = req.body;
    const product = await Products.findByPk(req.params.id);

    if (product) {
      await product.update({ productName });

      sendSuccessResponse(res, product);
    } else {
      sendErrorResponse(res, 'Product not found', 404);
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const product = await Products.findByPk(req.params.id);

    if (product) {
      await product.destroy();

      sendSuccessResponse(res);
    } else {
      sendErrorResponse(res, 'Product not found', 404);
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});
