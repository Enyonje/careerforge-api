import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  validateApiKey(apiKey: string): boolean {
    // Replace with your own API key validation logic or DB lookup
    return apiKey === process.env.API_KEY;
  }

  async validateJwt(payload: any) {
    // Add user validation logic if needed
    return payload;
  }

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}