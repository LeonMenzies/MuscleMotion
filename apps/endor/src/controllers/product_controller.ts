import express, { Request, Response } from 'express';
import { Product } from '../models/product';
import { sendSuccessResponse } from '../helpers/response_handler';
import { RequestHelper } from '../helpers/request_helper';
import { errorHandler } from '../helpers/error_handler';
import { APIException } from '../helpers/exceptions';
import { ProductService } from '../services/product_service';
import { ProductCategory } from '../models/product_category';
import { ProductSubCategory } from '../models/product_sub_category';
import { ProductImage } from '../models/product_image';
import { ProductImageType } from '../models/product_image_type';
import { ProductInformation } from '../models/product_information';
import { ProductInventory } from '../models/product_inventory';
import { Color } from '../models/color';
import { Size } from '../models/size';

export const router = express.Router();

router.get('/products', async (req: Request, res: Response) => {
  try {
    const helper = new RequestHelper(req, true);
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
      products = await Product.findOne({
        where: whereClause,
        attributes: ['id', 'categoryId', 'subCategoryId', 'name', 'price'],

        include: [
          {
            model: ProductImage,
            attributes: ['imageUrl'],
            include: [
              {
                model: ProductImageType,
                attributes: ['imageType'],
              },
            ],
          },
          {
            model: ProductInformation,
            attributes: ['description'],
          },
        ],
      });
    } else {
      products = await Product.findAll({
        where: whereClause,
        attributes: ['id', 'categoryId', 'subCategoryId', 'name', 'price'],
        include: [
          {
            model: ProductImage,
            attributes: ['imageUrl'],
            include: [
              {
                model: ProductImageType,
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
    const id = helper.getRequiredParam('id');
    const name = helper.getRequiredParam('name');
    const price = helper.getRequiredParam('price');
    const categoryId = helper.getRequiredParam('categoryId');
    const subCategoryId = helper.getRequiredParam('subCategoryId');
    const sizes = helper.getRequiredParam('sizes');
    const colors = helper.getRequiredParam('colors');
    const description = helper.getParam('description');

    const productService = new ProductService();
    await productService.updateProduct(
      id,
      name,
      price,
      categoryId,
      subCategoryId,
      sizes,
      colors,
      description
    );

    sendSuccessResponse(res, { productId: id });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.get('/categories', async (req: Request, res: Response) => {
  try {
    new RequestHelper(req, true);

    const categoriesWithSubcategories = await ProductCategory.findAll({
      attributes: ['id', 'name', 'displayName'],
      include: [
        {
          model: ProductSubCategory,
          attributes: ['id', 'categoryId', 'name', 'displayName'],
        },
      ],
    });

    sendSuccessResponse(res, categoriesWithSubcategories);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.get('/inventory', async (req: Request, res: Response) => {
  try {
    const helper = new RequestHelper(req);
    const categoryId = helper.getParam('categoryId');
    const subCategoryId = helper.getParam('subCategoryId');
    const productId = helper.getParam('productId');
    const inventoryId = helper.getParam('inventoryId');

    const inventoryFilter = {};
    if (inventoryId) {
      inventoryFilter['id'] = inventoryId;
    }

    const productFilter = {};
    if (productId) {
      productFilter['id'] = productId;
    }
    if (categoryId) {
      productFilter['categoryId'] = categoryId;
    }
    if (subCategoryId) {
      productFilter['subCategoryId'] = subCategoryId;
    }

    const inventory = await ProductInventory.findAll({
      where: inventoryFilter,
      attributes: ['id', 'count'],
      include: [
        {
          model: Product,
          where: productFilter,
          attributes: ['id', 'categoryId', 'subCategoryId', 'name', 'price'],
          include: [
            {
              model: ProductImage,
              where: { productImageTypeId: 1 },
              attributes: ['imageUrl'],
            },
          ],
        },
        {
          model: Size,
          attributes: ['id', 'name'],
        },
        {
          model: Color,
          attributes: ['id', 'name'],
        },
      ],
    });

    sendSuccessResponse(res, inventory);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.get('/inventory/overview', async (req: Request, res: Response) => {
  try {
    const helper = new RequestHelper(req);
    const categoryId = helper.getParam('categoryId');
    const subCategoryId = helper.getParam('subCategoryId');
    const productId = helper.getParam('productId');
    const inventoryId = helper.getParam('inventoryId');

    const inventoryFilter = {};
    if (inventoryId) {
      inventoryFilter['id'] = inventoryId;
    }

    const productFilter = {};
    if (productId) {
      productFilter['id'] = productId;
    }
    if (categoryId) {
      productFilter['categoryId'] = categoryId;
    }
    if (subCategoryId) {
      productFilter['subCategoryId'] = subCategoryId;
    }

    const inventory = await ProductInventory.findAll({
      where: inventoryFilter,
      attributes: ['id', 'count'],
      include: [
        {
          model: Product,
          where: productFilter,
          attributes: ['id', 'categoryId', 'subCategoryId', 'name', 'price'],
          include: [
            {
              model: ProductImage,
              where: { productImageTypeId: 1 },
              attributes: ['imageUrl'],
            },
          ],
        },
        {
          model: Size,
          attributes: ['id', 'name'],
        },
        {
          model: Color,
          attributes: ['id', 'name'],
        },
      ],
    });

    // Group the inventory items by product
    const groups = inventory.reduce((acc, item) => {
      const productId = (item as any).Product.id;

      if (!acc[productId]) {
        acc[productId] = [];
      }

      acc[productId].push(item);

      return acc;
    }, {});

    // Create a matrix for each group
    const matrices = Object.values(groups).map((items: any) => {
      const matrix = {
        product: null,
        inventory: {},
      };

      for (const item of items) {
        const sizeName = (item as any).Size.name;
        const colorName = (item as any).Color.name;

        if (!matrix.inventory[sizeName]) {
          matrix.inventory[sizeName] = {};
        }

        matrix.inventory[sizeName][colorName] = (item as any).count;

        if (!matrix.product) {
          matrix.product = (item as any).Product;
        }
      }

      return matrix;
    });

    sendSuccessResponse(res, matrices);
  } catch (error) {
    errorHandler(error, req, res);
  }
});
