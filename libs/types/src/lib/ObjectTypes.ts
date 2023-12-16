export type UserT = {
  loggedIn: boolean;
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
  productInformationId: number;
  categoryId: number;
  subCategoryId: number;
  name: string;
  price: number;
  thumbnail1: string;
  thumbnail2: string;
  carouselImages: string[];
};
