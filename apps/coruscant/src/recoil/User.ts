import { atom } from 'recoil';
import { User } from '@musclemotion/types';

type TUserAtom = {
  loggedIn: boolean;
  user: User;
  jwt: string;
};

export const defaultUser = {
  loggedIn: false,
  user: {
    id: 0,
    firstName: '',
    lastName: '',
    email: '',
    roles: '',
  },
  jwt: '',
};

export const userAtom = atom<TUserAtom>({
  key: 'user',
  default: defaultUser,
});
