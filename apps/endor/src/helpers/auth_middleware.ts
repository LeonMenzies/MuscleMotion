import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { Request } from 'express';
import { APIException } from './exceptions';

const SECRET_KEY = 'yourSecretKey';
const SALT_ROUNDS = 10;

export const authenticateRequest = (req: Request) => {
  const token = req.cookies.token;

  if (!token) {
    throw new APIException('Authentication Failed');
  }

  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new APIException('Authentication Failed');
  }
};

export const authenticateLogin = (user: any, password: string) => {
  if (!user || !bcrypt.compareSync(password, user.passwordHash)) {
    throw new APIException('Invalid Login Details');
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, {
    expiresIn: '5h',
  });
  if (!token) {
    throw new APIException('Invalid Login Details');
  }
  return token;
};

export const hashPassword = (password: string) => {
  return bcrypt.hashSync(password, SALT_ROUNDS);
};
