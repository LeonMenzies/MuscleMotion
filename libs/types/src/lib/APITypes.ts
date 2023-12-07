import { User } from './ObjectTypes';

export interface ApiResponse<T> {
  success: boolean;
  errorMessage: string;
  data?: T;
}

export interface LoginRequest {
  Email: string;
  Password: string;
}

export interface LoginResponse
  extends ApiResponse<{
    user: User;
    jwt: string;
  }> {
  data: {
    user: User;
    jwt: string;
  };
}

export interface DecodedToken {
  // Define the properties you expect in the decoded token
  userId: string;
  // ... other properties
}

export interface Product {
  name: string;
  price: number;
  displayImage1: Blob;
  displayImage2: Blob;
}
