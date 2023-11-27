import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request } from 'express';
import { APIException } from './Exceptions';

const SECRET_KEY = 'yourSecretKey';
const SALT_ROUNDS = 10;

export const authenticateRequest = (req: Request) => {
  return;
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    throw new APIException('Authentication Failed');
  }

  try {
    jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new APIException('Authentication Failed');
  }
};

export const authenticateLogin = (user: any, password: string) => {
  if (!user || !bcrypt.compareSync(password, user.PasswordHash)) {
    throw new APIException('Invalid Login Details');
  }

  return jwt.sign(
    { FirstName: user.FirstName, LastName: user.LastName, Roles: user.Roles },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
};

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, SALT_ROUNDS);
};
