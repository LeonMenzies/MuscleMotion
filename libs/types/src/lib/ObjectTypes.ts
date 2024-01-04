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

export type ProductInformationT = {
  id?: number;
  description: string;
};

export type ProductImagesT = {
  [imageType: string]: Blob | null;
};

export type ProductImageT = {
  imageUrl: string;
  ProductImageType: ProductImageTypeT;
};

export type ProductImageTypeT = {
  imageType: string;
};
