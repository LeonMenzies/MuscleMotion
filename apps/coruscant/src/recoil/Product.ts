import { atom } from 'recoil';
import { ProductT } from '@musclemotion/types';

export const defaultProduct = {
  name: '',
  price: '',
  categoryId: 0,
  subCategoryId: 0,
};

export const productAtom = atom<ProductT>({
  key: 'product',
  default: defaultProduct,
});
