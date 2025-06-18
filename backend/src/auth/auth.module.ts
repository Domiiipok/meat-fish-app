import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

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
@Module({
  imports: [UsersModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {} // ✅ вот это должно быть экспортом

