import { atom } from 'recoil';
import { User } from '../types/ObjectTypes';

type TUserAtom = {
  loggedIn: boolean;
  user: User;
  jwt: string;
};

export const userAtom = atom<TUserAtom>({
  key: 'user',
  default: {
    loggedIn: false,
    user: {
      ID: 0,
      FirstName: '',
      LastName: '',
      Email: '',
      Roles: '',
    },
    jwt: '',
  },
});
