import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { HeaderAPIKeyStrategy } from 'passport-headerapikey';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(HeaderAPIKeyStrategy, 'api-key') {
  constructor() {
    super({ header: 'x-api-key', prefix: '' }, false);
  }

  async validate(apiKey: string): Promise<any> {
    if (apiKey === process.env.API_KEY) {
      return { apiKey }; // attaches to req.user
    }
    return null; // unauthorized
  }
}