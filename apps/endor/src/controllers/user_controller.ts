import express, { Request, Response } from 'express';
import { Users } from '../models/users';
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
      users = await Users.findByPk(userId, {
        attributes: ['id', 'firstName', 'lastName', 'email'],
      });
    } else {
      users = await Users.findAll({
        attributes: ['id', 'firstName', 'lastName', 'email'],
      });
    }

    sendSuccessResponse(res, users);
  } catch (error) {
    errorHandler(error, req, res);
  }
});
