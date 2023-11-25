import { NextFunction, Request, Response } from 'express';
import { sendErrorResponse } from './ResponseHandler';
import { APIException } from './APIException';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log('EROROROROR');
  console.log(error);

  if (error.name === 'ValidationError') {
    return sendErrorResponse({
      res: res,
      status: 400,
      errorMessage: error.message,
    });
  }

  if (error instanceof APIException) {
    // Handle APIException and send a JSON response
    return sendErrorResponse({ res: res, errorMessage: error.message });
  }

  // Default error response
  return sendErrorResponse({ res: res, errorMessage: 'Internal server error' });
};
