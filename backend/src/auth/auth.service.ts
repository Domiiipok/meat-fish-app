import { Injectable, UnauthorizedException, InternalServerErrorException } from '@nestjs/common';
import * as crypto from 'crypto';
import * as qs from 'querystring';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async verifyTelegram(initData: string) {
    try {
      const parsed = qs.parse(initData.replace(/\\u0026/g, '&')) as any;

      const hash = parsed.hash;
      delete parsed.hash;

      const secret = crypto
        .createHash('sha256')
        .update(process.env.TELEGRAM_BOT_TOKEN ?? '')
        .digest();

      const dataCheckString = Object.keys(parsed)
        .sort()
        .map((key) => `${key}=${parsed[key]}`)
        .join('\n');

      const hmac = crypto
        .createHmac('sha256', secret)
        .update(dataCheckString)
        .digest('hex');

      if (hmac !== hash) {
        throw new UnauthorizedException('Invalid Telegram init data');
      }

      const user = parsed.user ? JSON.parse(parsed.user) : null;
      if (!user?.id) {
        throw new UnauthorizedException('Invalid user payload');
      }

      const created = await this.usersService.createOrFindUser(user);
      return { ok: true, user: created };
    } catch (err) {
      console.error('[AUTH ERROR]', err);
      throw new InternalServerErrorException('Telegram Auth Failed');
    }
  }
}
