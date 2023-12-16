import { atom } from 'recoil';
import { User } from '@musclemotion/types';

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
      id: 0,
      firstName: '',
      lastName: '',
      email: '',
      roles: '',
    },
    jwt: '',
  },
});
