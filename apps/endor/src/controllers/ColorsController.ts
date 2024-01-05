import express, { Request, Response } from 'express';
import { Colors } from '../models/Colors';
import { sendSuccessResponse } from '../helpers/ResponseHandler';
import { errorHandler } from '../helpers/ErrorHandler';

export const router = express.Router();

router.get('/colors', async (req: Request, res: Response) => {
  try {
    const colors = await Colors.findAll({
      attributes: ['id', 'name', 'displayName', 'colorHex'],
    });

    sendSuccessResponse(res, colors);
  } catch (error) {
    errorHandler(error, req, res);
  }
});
