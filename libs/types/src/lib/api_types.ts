import { ProductImageT, ProductInformationT } from './object_types';

export interface ApiResponse<T> {
  success: boolean;
  errorMessage: string;
  data?: T;
}

export type LoginRequestT = {
  email: string;
  password: string;
};

export type LoginResponseT = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: string;
  passwordHash: string;
};

export type ProductResponseT = {
  id: number;
  categoryId: number;
  subCategoryId: number;
  name: string;
  price: string;
  ProductImages: ProductImageT[];
  ProductInformation?: ProductInformationT;
};

export type ProductCategoryResponseT = {
  id: number;
  name: string;
  displayName: string;
  ProductSubCategories: ProductSubCategoriesResponseT[];
};

export type ProductSubCategoriesResponseT = {
  id: number;
  categoryId: number;
  name: string;
  displayName: string;
};

export type SizesResponseT = {
  id: number;
  name: string;
  displayName: string;
};

export type ColorsResponseT = {
  id: number;
  name: string;
  displayName: string;
  colorHex: string;
};

export type ProductInventoryResponseT = {
  product: {
    id: number;
    categoryId: number;
    subCategoryId: number;
    name: string;
    price: string;
    ProductImages: ProductImageT[];
  };
  inventory: SizeInventoryT;
};

export type ColorInventoryT = {
  [color: string]: number;
};

export type SizeInventoryT = {
  [size: string]: ColorInventoryT;
};
