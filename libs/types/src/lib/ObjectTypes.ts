export type UserT = {
  loggedIn: boolean;
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: string;
};

export type ProductT = {
  id?: number;
  name: string;
  price: string;
  categoryId: number;
  subCategoryId: number;
};

export type ProductImageT = {
  imageUrl: string;
  ProductImageType: ProductImageTypeT;
};

export type ProductImageTypeT = {
  imageType: string;
};

export type ProductInformationT = {
  description: string;
};
