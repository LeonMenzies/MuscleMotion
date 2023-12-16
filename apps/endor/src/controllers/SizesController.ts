import express, { Request, Response } from 'express';
import { Sizes } from '../models/Sizes'; // Replace with the actual path
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../helpers/ResponseHandler';
import { errorHandler } from '../helpers/ErrorHandler';

export const router = express.Router();

// Route: GET / - Get all sizes
router.get('/', async (req: Request, res: Response) => {
  try {
    const sizes = await Sizes.findAll();
    res.json({ data: sizes });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Route: POST / - Create a new size
router.post('/', async (req: Request, res: Response) => {
  try {
    const { sizeName } = req.body;
    const size = await Sizes.create({ sizeName });
    res.json({ entity: size });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Route: GET /:id - Get a size by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const size = await Sizes.findByPk(req.params.id);
    if (size) {
      sendSuccessResponse(res, size);
    } else {
      sendErrorResponse(res, 'Size not found', 404);
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Route: PUT /:id - Update a size by d
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { sizeName } = req.body;
    const size = await Sizes.findByPk(req.params.id);

    if (size) {
      await size.update({ sizeName });
      res.json({ entity: size });
    } else {
      res.status(404).json({ error: 'Size not found' });
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Route: DELETE /:id - Delete a size by id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const size = await Sizes.findByPk(req.params.id);

    if (size) {
      await size.destroy();
      res.json({ message: 'Size deleted successfully' });
    } else {
      res.status(404).json({ error: 'Size not found' });
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});
