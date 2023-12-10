import { Request, Response } from 'express';
import { sendErrorResponse } from './ResponseHandler';

export const errorHandler = (error: Error, req: Request, res: Response) => {
  console.error(error.stack);
  console.error(error.message);

  switch (error.name) {
    case 'APIException':
      return sendErrorResponse(res, error.message, 400);
    case 'ValidationException':
      return sendErrorResponse(res, error.message, 400);
    default:
      return sendErrorResponse(res, 'Internal server error');
  }
};
