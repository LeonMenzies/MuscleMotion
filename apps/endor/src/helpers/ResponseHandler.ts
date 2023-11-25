import { Response } from 'express';
import { logger } from '../helpers/Logger';

type ResponseDataType = {
  res: Response;
  success?: boolean;
  errorMessage?: string;
  data?: any;
};

type ErrorResponseDataType = {
  res: Response;
  success?: boolean;
  errorMessage?: string;
  status?: number;
};

export const sendSuccessResponse = ({ res, data }: ResponseDataType) => {
  console.log(res);

  let responseData: {
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

export const sendErrorResponse = ({
  res,
  errorMessage,
  status = 500,
}: ErrorResponseDataType) => {
  let responseData = {
    success: false,
    errorMessage: errorMessage,
  };
  logger.error(errorMessage);

  return res.status(status).json(responseData);
};
