import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const SECRET_KEY = 'yourSecretKey';
const SALT_ROUNDS = 10;

export const authenticateRequest = (req: any, res: any, next: any) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const decodedToken = jwt.verify(token, SECRET_KEY);
    req.userData = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const authenticateLogin = (user: any, password: string) => {
  if (!user || !bcrypt.compareSync(password, user.PasswordHash)) {
    throw 'Invalid Login Details';
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
