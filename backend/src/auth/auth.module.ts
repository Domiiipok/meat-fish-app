import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('telegram')
  async authByTelegram(@Body() body: { initData: string }) {
    const { initData } = body;

    const user = this.authService.validateTelegramAuth(initData);
    return { ok: true, user };
  }
}
