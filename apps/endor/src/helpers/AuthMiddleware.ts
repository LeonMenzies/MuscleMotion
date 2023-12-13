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
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    throw new APIException('Invalid Login Details');
  }

  const token = jwt.sign(
    { FirstName: user.firstName, lastName: user.lastName, roles: user.roles },
    SECRET_KEY,
    { expiresIn: '1h' }
  );
  if (!token) {
    throw new APIException('Invalid Login Details');
  }
  return token;
};

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, SALT_ROUNDS);
};
