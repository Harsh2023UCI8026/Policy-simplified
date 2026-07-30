import { Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register() {
    // Mock response for user registration
    return this.authService.register();
  }

  @Post('login')
  login() {
    // Mock response for user login
    return this.authService.login();
  }

  @Post('refresh')
  refresh() {
    // Mock response for token refresh
    return this.authService.refresh();
  }

  @Get('health')
  health() {
    // Simple health check endpoint
    return this.authService.health();
  }
}
