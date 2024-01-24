import { Response } from 'express';
import { createLog } from '../helpers/Logger';

export const sendSuccessResponse = (res: Response, data?: unknown) => {
  const responseData: {
    success: boolean;
    errorMessage: string;
    data?: unknown;
  } = {
    success: true,
    errorMessage: '',
  };
  if (data) {
    responseData.data = data;
  }
  createLog('success', res.req?.originalUrl, res.req?.body, responseData);
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
  createLog('error', res.req?.originalUrl, res.req?.body, responseData);

  return res.status(status).json(responseData);
};
