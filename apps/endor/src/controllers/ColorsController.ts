import express, { Request, Response } from 'express';
import { Colors } from '../models/Colors';
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../helpers/ResponseHandler';
import { errorHandler } from '../helpers/ErrorHandler';

export const router = express.Router();

// Route: GET / - Get all colors
router.get('/', async (req: Request, res: Response) => {
  try {
    const colors = await Colors.findAll();

    if (colors) {
      sendSuccessResponse(res, colors);
    } else {
      sendErrorResponse(res, 'Color not found', 404);
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Route: POST / - Create a new color
router.post('/', async (req: Request, res: Response) => {
  try {
    const { colorName } = req.body;
    const color = await Colors.create({ colorName });

    if (color) {
      sendSuccessResponse(res, color);
    } else {
      sendErrorResponse(res, 'Color not found', 404);
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.get('/:id', async (req: Request, res: Response) => {
  try {
    const color = await Colors.findByPk(req.params.id);

    if (color) {
      sendSuccessResponse(res, color);
    } else {
      sendErrorResponse(res, 'Color not found', 404);
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Route: PUT /:id - Update a color by Id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { colorName } = req.body;
    const color = await Colors.findByPk(req.params.id);

    if (color) {
      await color.update({ colorName });

      sendSuccessResponse(res, color);
    } else {
      sendErrorResponse(res, 'Color not found', 404);
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Route: DELETE /:id - Delete a color by Id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const color = await Colors.findByPk(req.params.id);

    if (color) {
      await color.destroy();

      sendSuccessResponse(res);
    } else {
      sendErrorResponse(res, 'Color not found', 404);
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});
