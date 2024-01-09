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
// import { ProductInventory } from '../models/ProductInventory';

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
    const sizes = helper.getRequiredParam('sizes');
    const colors = helper.getRequiredParam('colors');
    const description = helper.getParam('description');

    const productService = new ProductService();
    const productIdResponse = await productService.createProduct(
      name,
      price,
      categoryId,
      subCategoryId,
      sizes,
      colors,
      description
    );

    sendSuccessResponse(res, productIdResponse);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.post('/update', async (req: Request, res: Response) => {
  try {
    const helper = new RequestHelper(req);
    const name = helper.getRequiredParam('name');
    const price = helper.getRequiredParam('price');
    const categoryId = helper.getRequiredParam('categoryId');
    const subCategoryId = helper.getRequiredParam('subCategoryId');
    const id = helper.getRequiredParam('id');
    const description = helper.getParam('description');

    const productService = new ProductService();
    await productService.updateProduct(
      id,
      name,
      price,
      categoryId,
      subCategoryId,
      description
    );

    sendSuccessResponse(res, { productId: id });
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

// router.get('/inventory', async (req: Request, res: Response) => {
//   try {
//     const helper = new RequestHelper(req);
//     const categoryId = helper.getParam('categoryId');

//     const inventory = await ProductInventory.findAll({
//       where: whereClause,
//       attributes: ['id', 'categoryId', 'subCategoryId', 'name', 'price'],
//       include: [
//         {
//           model: ProductImages,
//           as: 'ProductImages',
//           attributes: ['imageUrl'],
//           include: [
//             {
//               model: ProductImageTypes,
//               as: 'ProductImageType',
//               attributes: ['imageType'],
//             },
//           ],
//         },
//       ],
//     });

//     sendSuccessResponse(res, categoriesWithSubcategories);
//   } catch (error) {
//     errorHandler(error, req, res);
//   }
// });
