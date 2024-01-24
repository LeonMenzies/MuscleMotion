import { ValidationException } from './exceptions';

export const validateString = (
  param: string,
  value: string,
  minLength: number,
  maxLength: number
) => {
  if (value.length < minLength) {
    throw new ValidationException(
      `Value for ${param} cannot be shorter that 10 characters`
    );
  }
  if (value.length > maxLength) {
    throw new ValidationException(
      `Value for ${param} cannot be longer that 10 characters`
    );
  }
};
