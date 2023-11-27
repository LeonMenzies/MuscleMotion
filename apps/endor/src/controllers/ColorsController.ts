import express from 'express';
import { Colors } from '../models/Colors';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../helpers/ResponseHandler';
import { APIException } from '../helpers/APIException';

export const router = express.Router();

// Route: GET / - Get all colors
router.get('/', async (req, res, next) => {
  try {
    const colors = await Colors.findAll();

    if (colors) {
      sendSuccessResponse({
        res,
        data: colors,
      });
    } else {
      sendErrorResponse({
        res,
        errorMessage: 'Color not found',
        status: 404,
      });
    }
  } catch (error) {
    next(error);
  }
});

// Route: POST / - Create a new color
router.post('/', async (req, res, next) => {
  try {
    const { colorName } = req.body;
    const color = await Colors.create({ colorName });

    if (color) {
      sendSuccessResponse({
        res,
        data: color,
      });
    } else {
      sendErrorResponse({
        res,
        errorMessage: 'Color not found',
        status: 404,
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const color = await Colors.findByPk(req.params.id);

    if (color) {
      sendSuccessResponse({
        res,
        data: color,
      });
    } else {
      sendErrorResponse({
        res,
        errorMessage: 'Color not found',
        status: 404,
      });
    }
  } catch (error) {
    next(error);
  }
});

// Route: PUT /:id - Update a color by ID
router.put('/:id', async (req, res, next) => {
  try {
    const { colorName } = req.body;
    const color = await Colors.findByPk(req.params.id);

    if (color) {
      await color.update({ colorName });

      sendSuccessResponse({
        res,
        data: color,
      });
    } else {
      sendErrorResponse({
        res,
        errorMessage: 'Color not found',
        status: 404,
      });
    }
  } catch (error) {
    next(error);
  }
});

// Route: DELETE /:id - Delete a color by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const color = await Colors.findByPk(req.params.id);

    if (color) {
      await color.destroy();

      sendSuccessResponse({
        res,
      });
    } else {
      sendErrorResponse({
        res,
        errorMessage: 'Color not found',
        status: 404,
      });
    }
  } catch (error) {
    next(error);
  }
});
