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
  categoryId: number;
  subCategoryId: number;
  name: string;
  price: string;
  ProductImages: ProductImageT[];
  ProductInformation?: ProductInformationT;
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
