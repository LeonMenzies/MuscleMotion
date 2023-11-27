import { DecodedToken } from '@musclemotion/types';
import { authenticateRequest } from './AuthMiddleware';
import { Request } from 'express';
import { APIException } from './Exceptions';
import { validateString } from './Validators';

export class RequestHelper {
  private request: Request;
  private decodedToken: DecodedToken | null = null;

  constructor(request: Request) {
    this.request = request;
    this.validateJwt();
  }

  private validateJwt() {
    authenticateRequest(this.request);
  }

  getParam(paramName: string): string | undefined {
    return this.validateParam(paramName, this.request.body[paramName]);
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
        validateString(param, value, 10, 10);
        break;
      case 'description':
        break;
      case 'price':
        break;

      default:
        break;
    }
    return param;
  }
}
