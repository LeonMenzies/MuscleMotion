import { Response } from 'express';
import { logger } from '../helpers/Logger';

export const sendSuccessResponse = (res: Response, data?: any) => {
  const responseData: {
    success: boolean;
    errorMessage: string;
    data?: any;
  } = {
    success: true,
    errorMessage: '',
  };
  if (data) {
    responseData.data = data;
  }
  logger.info('success');

  return res.status(200).json(responseData);
};

export const sendErrorResponse = (
  res: Response,
  errorMessage?: string,
  status: number = 500
) => {
  const responseData = {
    success: false,
    errorMessage: errorMessage,
  };
  logger.error(errorMessage);

  return res.status(status).json(responseData);
};
