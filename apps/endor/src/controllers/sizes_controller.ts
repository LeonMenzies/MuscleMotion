import express, { Request, Response } from 'express';
import { Sizes } from '../models/sizes'; // Replace with the actual path
import { sendSuccessResponse } from '../helpers/response_handler';
import { errorHandler } from '../helpers/error_handler';
import { RequestHelper } from '../helpers/request_helper';

export const router = express.Router();

router.get('/sizes', async (req: Request, res: Response) => {
  try {
    new RequestHelper(req);

    const sizes = await Sizes.findAll({
      attributes: ['id', 'name', 'displayName'],
    });

    sendSuccessResponse(res, sizes);
  } catch (error) {
    errorHandler(error, req, res);
  }
});
