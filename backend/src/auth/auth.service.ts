import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as crypto from 'crypto';
import * as qs from 'querystring';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async verifyTelegram(initData: string) {
    // ✅ 1. Парсим initData
    const parsed = qs.parse(initData.replace(/\+/g, '%20')) as any;
    const hash = parsed.hash;
    delete parsed.hash;

    // ✅ 2. Секрет на основе BOT_TOKEN
    const secret = crypto
      .createHash('sha256')
      .update(process.env.TELEGRAM_BOT_TOKEN as string)
      .digest();

    // ✅ 3. Формируем строку для подписи
    const dataCheckString = Object.keys(parsed)
      .sort()
      .map((key) => `${key}=${parsed[key]}`)
      .join('\n');

    // ✅ 4. HMAC-подпись
    const hmac = crypto
      .createHmac('sha256', secret)
      .update(dataCheckString)
      .digest('hex');

    // ✅ 5. Сравнение подписи
    if (hmac !== hash) {
      throw new UnauthorizedException('Invalid Telegram init data');
    }

    // ✅ 6. Парсим user из строки
    const user = parsed.user ? JSON.parse(parsed.user) : null;
    if (!user?.id) {
      throw new UnauthorizedException('Invalid user payload');
    }

    // ✅ 7. Сохраняем пользователя в Supabase
    await this.usersService.upsertUser(user);
  }
}
