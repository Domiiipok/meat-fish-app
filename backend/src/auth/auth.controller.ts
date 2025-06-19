import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('telegram')
  async authTelegram(@Body() body: { initData: string }) {
    await this.authService.verifyTelegram(body.initData);
    return { message: '✅ Telegram auth successful' };
  }
}
