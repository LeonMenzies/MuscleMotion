import express, { Request, Response } from 'express';
import { Products } from '../models/Products';
import { sendSuccessResponse } from '../helpers/ResponseHandler';
import { RequestHelper } from '../helpers/RequestHelper';
import { errorHandler } from '../helpers/ErrorHandler';
import { APIException } from '../helpers/Exceptions';
import { ProductService } from '../services/product_service';
import { ProductCategories } from '../models/ProductCategories';
import { ProductSubCategories } from '../models/ProductSubCategories';

export const router = express.Router();

router.get('/products', async (req: Request, res: Response) => {
  try {
    const helper = new RequestHelper(req);
    const categoryId = helper.getParam('categoryId');
    const subCategoryId = helper.getParam('subCategoryId');

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
    const categoryId = helper.getRequiredParam('categoryId');
    const subCategoryId = helper.getRequiredParam('subCategoryId');
    const description = helper.getParam('description');

    const productService = new ProductService();
    const productId = await productService.createProduct(
      name,
      price,
      categoryId,
      subCategoryId,
      description
    );

    sendSuccessResponse(res, productId);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.get('/categories', async (req: Request, res: Response) => {
  try {
    const categoriesWithSubcategories = await ProductCategories.findAll({
      attributes: ['id', 'name', 'displayName'],
      include: [
        {
          model: ProductSubCategories,
          attributes: ['id', 'categoryId', 'name', 'displayName'],
        },
      ],
    });

    sendSuccessResponse(res, categoriesWithSubcategories);
  } catch (error) {
    errorHandler(error, req, res);
  }
});
