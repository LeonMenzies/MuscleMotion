import express, { Request, Response } from 'express';

import { Products } from '../models/Products';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../helpers/ResponseHandler';
import { RequestHelper } from '../helpers/RequestHelper';
import { errorHandler } from '../helpers/ErrorHandler';
import { APIException } from '../helpers/Exceptions';

export const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await Products.findAll();

    if (products) {
      sendSuccessResponse({
        res,
        data: products,
      });
    } else {
      throw new APIException('Failed to add Product');
    }
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req: Request, res: Response) => {
  try {
    const helper = new RequestHelper(req);
    const name = helper.getRequiredParam('name');
    const description = helper.getRequiredParam('description');
    const price = helper.getRequiredParam('price');

    const result = await Products.create({
      name: name,
      description: description,
      price: price,
    });

    if (!result) {
      throw new APIException('Failed to add Product');
    } else {
      sendSuccessResponse({
        res,
      });
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Products.findByPk(req.params.id);

    if (product) {
      sendSuccessResponse({
        res,
        data: product,
      });
    } else {
      sendErrorResponse({
        res,
        errorMessage: 'Product not found',
        status: 404,
      });
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const { productName } = req.body;
    const product = await Products.findByPk(req.params.id);

    if (product) {
      await product.update({ productName });

      sendSuccessResponse({
        res,
        data: product,
      });
    } else {
      sendErrorResponse({
        res,
        errorMessage: 'Product not found',
        status: 404,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const product = await Products.findByPk(req.params.id);

    if (product) {
      await product.destroy();

      sendSuccessResponse({
        res,
      });
    } else {
      sendErrorResponse({
        res,
        errorMessage: 'Product not found',
        status: 404,
      });
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});
