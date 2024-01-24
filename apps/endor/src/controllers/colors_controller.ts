import express, { Request, Response } from 'express';
import { Colors } from '../models/colors';
import { sendSuccessResponse } from '../helpers/response_handler';
import { errorHandler } from '../helpers/error_handler';
import { RequestHelper } from '../helpers/request_helper';

export const router = express.Router();

router.get('/colors', async (req: Request, res: Response) => {
  try {
    new RequestHelper(req);

    const colors = await Colors.findAll({
      attributes: ['id', 'name', 'displayName', 'colorHex'],
    });

    sendSuccessResponse(res, colors);
  } catch (error) {
    errorHandler(error, req, res);
  }
});
