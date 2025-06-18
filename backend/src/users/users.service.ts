import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UsersService {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  async createOrFindUser(telegramUser: any) {
    const telegramId = telegramUser.id;

    const { data: existing, error: findError } = await this.supabase
      .from('users')
      .select('*')
      .eq('telegram_id', telegramId)
      .single();

    if (existing) return existing;

    const { data, error } = await this.supabase.from('users').insert([
      {
        telegram_id: telegramUser.id,
        username: telegramUser.username,
        first_name: telegramUser.first_name,
        last_name: telegramUser.last_name,
      },
    ]).select().single();

    if (error) throw error;
    return data;
  }
}
