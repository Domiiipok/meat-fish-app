import { Injectable } from '@nestjs/common';
import { createClient } from '@supabase/supabase-js';

@Injectable()
export class UsersService {
  private supabase = createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  async upsertUser(user: any) {
    const { error } = await this.supabase
      .from('users')
      .upsert({
        id: user.id,
        username: user.username,
        first_name: user.first_name,
        last_name: user.last_name,
        photo_url: user.photo_url,
        language_code: user.language_code,
        is_premium: user.is_premium,
      });

    if (error) throw new Error(error.message);
  }
}
