import { atom } from 'recoil';
import { UserT } from '@musclemotion/types';

export const defaultUser = {
  loggedIn: false,
  id: 0,
  firstName: '',
  lastName: '',
  email: '',
  roles: '',
};

export const userAtom = atom<UserT>({
  key: 'user',
  default: defaultUser,
});
