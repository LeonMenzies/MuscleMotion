import express, { Request, Response } from 'express';
import { Sizes } from '../models/sizes'; // Replace with the actual path
import { sendSuccessResponse } from '../helpers/ResponseHandler';
import { errorHandler } from '../helpers/ErrorHandler';

export const router = express.Router();

router.get('/sizes', async (req: Request, res: Response) => {
  try {
    const sizes = await Sizes.findAll({
      attributes: ['id', 'name', 'displayName'],
    });

    sendSuccessResponse(res, sizes);
  } catch (error) {
    errorHandler(error, req, res);
  }
});
