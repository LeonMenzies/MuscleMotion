import express, { Request, Response } from 'express';
import { Users } from '../models/Users';
import { authenticateLogin, hashPassword } from '../helpers/AuthMiddleware';
import { errorHandler } from '../helpers/ErrorHandler';

export const router = express.Router();

// Route: GET /users - Get all users
router.get('/', async (req: Request, res: Response) => {
  try {
    const users = await Users.findAll();
    res.json({ users });
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Route: GET /users/:id - Get a user by id
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const user = await Users.findByPk(req.params.id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Route: POST /users - Create a new user
router.post('/', async (req: Request, res: Response) => {
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
    console.error(error);
    errorHandler(error, req, res);
  }
});

// Route: PUT /users/:id - Update a user by id
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const user = await Users.findByPk(req.params.id);

    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Route: DELETE /users/:id - Delete a user by id
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    const user = await Users.findByPk(req.params.id);

    if (user) {
      await user.destroy();
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});

// Route: POST /users/login - Login user
router.post('/login', async (req: Request, res: Response) => {
  try {
    const { Email, Password } = req.body;

    const user = await Users.findOne({ where: { Email } });
    const jwt = authenticateLogin(user, Password);

    if (jwt) {
      res.json({ jwt });
    } else {
      res.status(404).json({ error: 'Login Failed' });
    }
  } catch (error) {
    errorHandler(error, req, res);
  }
});
