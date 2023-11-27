import { Request, Response } from 'express';
import { sendErrorResponse } from './ResponseHandler';

export const errorHandler = (error: Error, req: Request, res: Response) => {
  switch (error.name) {
    case 'APIException':
      return sendErrorResponse({
        res: res,
        status: 400,
        errorMessage: error.message,
      });

    case 'ValidationException':
      return sendErrorResponse({
        res: res,
        status: 400,
        errorMessage: error.message,
      });
    default:
      return sendErrorResponse({
        res: res,
        errorMessage: 'Internal server error',
      });
  }
};
