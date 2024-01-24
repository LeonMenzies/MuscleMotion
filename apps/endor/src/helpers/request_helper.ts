import { authenticateRequest } from './auth_middleware';
import { Request } from 'express';
import { APIException } from './exceptions';
import { validateString } from './validators';

export class RequestHelper {
  private request: Request;
  private userEmail: string;

  constructor(request: Request, skipAuth = false) {
    this.request = request;
    if (!skipAuth) {
      this.validateJwt();
    }
  }

  private validateJwt() {
    const decodedToken = authenticateRequest(this.request);
    this.userEmail = decodedToken.email;
  }

  getUserEmail(): string {
    return this.userEmail;
  }

  getParam(paramName: string): string | undefined {
    const paramValue =
      this.request.body[paramName] || this.request.query[paramName];
    return this.validateParam(paramName, paramValue);
  }

  getRequiredParam(paramName: string): string | undefined {
    const param = this.validateParam(paramName, this.request.body[paramName]);
    if (param) {
      return param;
    } else {
      throw new APIException(`Missing require param: ${paramName}`);
    }
  }

  validateParams(paramsObject: Record<string, any>): void {
    for (const [param, value] of Object.entries(paramsObject)) {
      this.validateParam(param, value);
    }
  }

  validateParam(param: string, value: string): string {
    if (!value) {
      return undefined;
    }

    switch (param) {
      case 'name':
        validateString(param, value, 3, 30);
        break;
      case 'description':
        break;
      case 'price':
        break;

      default:
        break;
    }
    return value;
  }
}
