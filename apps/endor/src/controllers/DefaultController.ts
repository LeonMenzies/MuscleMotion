import { Users } from '../models/Users';
import { authenticateLogin, hashPassword } from '../helpers/AuthMiddleware';
import { sendSuccessResponse } from '../helpers/ResponseHandler';
import express, { Request, Response } from 'express';
import { RequestHelper } from '../helpers/RequestHelper';
import { errorHandler } from '../helpers/ErrorHandler';

export const router = express.Router();

// Route: POST /signup - Create a new user
router.post('/signup', async (req: Request, res: Response) => {
  try {
    const helper = new RequestHelper(req);
    const firstName = helper.getRequiredParam('firstName');
    const lastName = helper.getRequiredParam('lastName');
    const email = helper.getRequiredParam('email');
    const role = helper.getRequiredParam('role');
    const password = helper.getRequiredParam('password');

    // Check if the email is already registered
    const existingUser = await Users.findOne({
      where: { email },
    });

    if (existingUser) {
      return res.status(400).json({ error: 'Email is already registered' });
    }

    // Create a new user
    const user = await Users.create({
      firstName,
      lastName,
      email,
      role,
      PasswordHash: hashPassword(password),
    });

    res.json(user);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Route: POST /logout - Logout user
router.post('/logout', async (req: Request, res: Response) => {
  try {
    const { FirstName, LastName, Email, Role, Password } = req.body;

    const user = await Users.create({
      FirstName,
      LastName,
      Email,
      Role,
      PasswordHash: hashPassword(Password),
    });

    res.json(user);
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Route: POST /users/login - Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;

    const user = await Users.findOne({
      where: { Email },
      attributes: [
        'ID',
        'FirstName',
        'LastName',
        'Email',
        'Roles',
        'PasswordHash',
      ],
    });

    const jwt = authenticateLogin(user, Password);

    if (jwt) {
      sendSuccessResponse(res, { user, jwt });
    } else {
      res.status(404).json({ error: 'Login Failed' });
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});
