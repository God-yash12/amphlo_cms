import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    const { username, password } = body;
    const tokens = await this.authService.login(username, password);
    return { accessToken: tokens.token };
  }

  @Post('validate')
  async validate(@Body() body: { token: string }) {
    const payload = await this.authService.validateToken(body.token);
    if (!payload) {
      throw new UnauthorizedException('Invalid token');
    }
    return { valid: true, user: payload.username };
  }
}
