import { DecodedToken } from '@musclemotion/types';
import { authenticateRequest } from './AuthMiddleware';
import { Request } from 'express';

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
    return this.request.body[paramName];
  }

  validateParams(params: string[]): void {
    for (const param of params) {
      switch (param) {
        case 'name':
          break;

        default:
          break;
      }
    }
  }

  validateRequiredParams(requiredParams: string[]): void {
    for (const param of requiredParams) {
      if (!this.getParam(param)) {
        throw new Error(`Missing required parameter: ${param}`);
      }
    }
  }
}
