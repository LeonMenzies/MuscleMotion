import { User } from '../models/user';
import { authenticateLogin, hashPassword } from '../helpers/auth_middleware';
import { sendSuccessResponse } from '../helpers/response_handler';
import express, { Request, Response } from 'express';
import { RequestHelper } from '../helpers/request_helper';
import { errorHandler } from '../helpers/error_handler';
import { APIException } from '../helpers/exceptions';

export const router = express.Router();

router.post('/signup', async (req: Request, res: Response) => {
  try {
    const helper = new RequestHelper(req, true);
    const firstName = helper.getRequiredParam('firstName');
    const lastName = helper.getRequiredParam('lastName');
    const email = helper.getRequiredParam('email');
    const password = helper.getRequiredParam('password');

    // Check if the email is already registered
    const existingUser = await User.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new APIException('Email is already registered');
    }

    // Create a new user
    const user = await User.create({
      firstName,
      lastName,
      email,
      user: 'user',
      passwordHash: hashPassword(password),
    });

    sendSuccessResponse(res, user);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const helper = new RequestHelper(req, true);
    const email = helper.getRequiredParam('email');
    const password = helper.getRequiredParam('password');

    const user = await User.findOne({
      where: { email },
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'roles',
        'passwordHash',
      ],
    });

    if (!user) {
      throw new APIException('Invalid Login Details');
    }

    const jwt = authenticateLogin(user, password);
    res.cookie('token', jwt, { httpOnly: true });

    sendSuccessResponse(res, user);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

router.get('/auth', async (req: Request, res: Response) => {
  try {
    const helper = new RequestHelper(req, true);
    const email = helper.getUserEmail();

    const user = await User.findOne({
      where: { email },
      attributes: [
        'id',
        'firstName',
        'lastName',
        'email',
        'roles',
        'passwordHash',
      ],
    });

    if (!user) {
      throw new APIException('Invalid Login Details');
    }

    sendSuccessResponse(res, user);
  } catch (error) {
    errorHandler(error, req, res);
  }
});
