import { Users } from '../models/Users';
import { authenticateLogin, hashPassword } from '../helpers/AuthMiddleware';
import { sendSuccessResponse } from '../helpers/ResponseHandler';
import express, { Request, Response } from 'express';
import { RequestHelper } from '../helpers/RequestHelper';
import { errorHandler } from '../helpers/ErrorHandler';
import { APIException } from '../helpers/Exceptions';

export const router = express.Router();

// Route: POST /signup - Create a new user
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const helper = new RequestHelper(req);
    const firstName = helper.getRequiredParam('firstName');
    const lastName = helper.getRequiredParam('lastName');
    const email = helper.getRequiredParam('email');
    const password = helper.getRequiredParam('password');

    // Check if the email is already registered
    const existingUser = await Users.findOne({
      where: { email },
    });

    if (existingUser) {
      throw new APIException('Email is already registered');
    }

    // Create a new user
    const user = await Users.create({
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

// Route: POST /users/login - Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const helper = new RequestHelper(req);
    const email = helper.getRequiredParam('email');
    const password = helper.getRequiredParam('password');

    const user = await Users.findOne({
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

    sendSuccessResponse(res, { user, jwt });
  } catch (error) {
    errorHandler(error, req, res);
  }
});
