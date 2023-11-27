import express from 'express';
import { Sizes } from '../models/Sizes'; // Replace with the actual path
import {
  sendErrorResponse,
  sendSuccessResponse,
} from '../helpers/ResponseHandler';

export const router = express.Router();

// Route: GET / - Get all sizes
router.get('/', async (req, res, next) => {
  try {
    const sizes = await Sizes.findAll();
    res.json({ data: sizes });
  } catch (error) {
    next(error);
  }
});

// Route: POST / - Create a new size
router.post('/', async (req, res, next) => {
  try {
    const { sizeName } = req.body;
    const size = await Sizes.create({ sizeName });
    res.json({ entity: size });
  } catch (error) {
    next(error);
  }
});

// Route: GET /:id - Get a size by ID
router.get('/:id', async (req, res, next) => {
  try {
    const size = await Sizes.findByPk(req.params.id);
    if (size) {
      sendSuccessResponse({
        res,
        data: size,
      });
    } else {
      sendErrorResponse({
        res,
        errorMessage: 'Size not found',
        status: 404,
      });
    }
  } catch (error) {
    next(error);
  }
});

// Route: PUT /:id - Update a size by ID
router.put('/:id', async (req, res, next) => {
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
    next(error);
  }
});

// Route: DELETE /:id - Delete a size by ID
router.delete('/:id', async (req, res, next) => {
  try {
    const size = await Sizes.findByPk(req.params.id);

    if (size) {
      await size.destroy();
      res.json({ message: 'Size deleted successfully' });
    } else {
      res.status(404).json({ error: 'Size not found' });
    }
  } catch (error) {
    next(error);
  }
});
