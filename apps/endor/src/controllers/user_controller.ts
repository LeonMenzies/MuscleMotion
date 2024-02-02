import express, { Request, Response } from 'express';
import { User } from '../models/user';
import { errorHandler } from '../helpers/error_handler';
import { sendSuccessResponse } from '../helpers/response_handler';
import { RequestHelper } from '../helpers/request_helper';

export const router = express.Router();

router.get('/users', async (req: Request, res: Response) => {
  try {
    const helper = new RequestHelper(req);
    const userId = helper.getParam('userId');
    let users;

    const whereClause = {};
    if (userId) {
      whereClause['id'] = userId;
    }

    if (userId) {
      users = await User.findByPk(userId, {
        attributes: ['id', 'firstName', 'lastName', 'email'],
      });
    } else {
      users = await User.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email'],
      });
    }

    sendSuccessResponse(res, users);
  } catch (error) {
    errorHandler(error, req, res);
  }
});
