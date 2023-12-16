import express, { Request, Response } from 'express';
import { Products } from '../models/Products';
import { sendSuccessResponse } from '../helpers/ResponseHandler';
import { RequestHelper } from '../helpers/RequestHelper';
import { errorHandler } from '../helpers/ErrorHandler';
import { APIException } from '../helpers/Exceptions';
import { ProductService } from '../services/product_service';
import { ProductCategories } from '../models/ProductCategories';
import { ProductSubCategories } from '../models/ProductSubCategories';
import { ProductImages } from '../models/ProductImages';
import { ProductImageTypes } from '../models/ProductImageTypes';
import { ProductInformation } from '../models/ProductInformation';

export const router = express.Router();

router.get('/products', async (req: Request, res: Response) => {
  try {
    const helper = new RequestHelper(req);
    const categoryId = helper.getParam('categoryId');
    const subCategoryId = helper.getParam('subCategoryId');
    const productId = helper.getParam('productId');

    let products;

    const whereClause = {};
    if (productId) {
      whereClause['id'] = productId;
    }
    if (categoryId) {
      whereClause['categoryId'] = categoryId;
    }
    if (subCategoryId) {
      whereClause['subCategoryId'] = subCategoryId;
    }

    if (productId) {
      products = await Products.findOne({
        where: whereClause,
        attributes: ['id', 'categoryId', 'subCategoryId', 'name', 'price'],

        include: [
          {
            model: ProductImages,
            as: 'ProductImages',
            attributes: ['imageUrl'],
            include: [
              {
                model: ProductImageTypes,
                as: 'ProductImageType',
                attributes: ['imageType'],
              },
            ],
          },
          {
            model: ProductInformation,
            as: 'ProductInformation',
            attributes: ['description'],
          },
        ],
      });
    } else {
      products = await Products.findAll({
        where: whereClause,
        attributes: ['id', 'categoryId', 'subCategoryId', 'name', 'price'],
        include: [
          {
            model: ProductImages,
            as: 'ProductImages',
            attributes: ['imageUrl'],
            include: [
              {
                model: ProductImageTypes,
                as: 'ProductImageType',
                attributes: ['imageType'],
              },
            ],
          },
        ],
      });
    }

    if (products) {
      sendSuccessResponse(res, products);
    } else {
      throw new APIException('No Products Found');
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
