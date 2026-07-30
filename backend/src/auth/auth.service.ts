import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  register() {
    return { success: true, message: 'User registered (mock)' };
  }

  login() {
    return { success: true, message: 'Login successful (mock)', accessToken: 'mock-access-token', refreshToken: 'mock-refresh-token' };
  }

  refresh() {
    return { success: true, accessToken: 'new-mock-access-token' };
  }

  health() {
    return { status: 'ok' };
  }
}
