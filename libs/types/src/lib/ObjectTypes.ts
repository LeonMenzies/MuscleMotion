export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  roles: string;
};

export type ProductCategoriesT = {
  id: number;
  name: string;
  displayName: string;
};

export type ProductT = {
  id: number;
  productInformationID: number;
  categoryID: number;
  subCategoryID: number;
  name: string;
  price: number;
  thumbnail1: string;
  thumbnail2: string;
  carouselImages: string[];
};
