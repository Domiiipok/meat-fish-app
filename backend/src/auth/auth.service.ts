import { Injectable, InternalServerErrorException } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class UsersService {
  private readonly supabaseUrl = process.env.SUPABASE_URL;
  private readonly supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  async createOrFindUser(user: { id: number, first_name?: string, last_name?: string, username?: string }) {
    try {
      // 1. Поиск пользователя
      const query = await fetch(`${this.supabaseUrl}/rest/v1/users?id=eq.${user.id}`, {
        headers: {
          apikey: this.supabaseKey,
          Authorization: `Bearer ${this.supabaseKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!query.ok) {
        throw new Error(`[FIND_USER] Supabase error: ${query.status}`);
      }

      const existing = await query.json();

      if (existing.length > 0) {
        return existing[0];
      }

      // 2. Создание нового пользователя
      const create = await fetch(`${this.supabaseUrl}/rest/v1/users`, {
        method: 'POST',
        headers: {
          apikey: this.supabaseKey,
          Authorization: `Bearer ${this.supabaseKey}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation',
        },
        body: JSON.stringify({
          id: user.id,
          first_name: user.first_name || '',
          last_name: user.last_name || '',
          username: user.username || '',
        }),
      });

      if (!create.ok) {
        throw new Error(`[CREATE_USER] Supabase error: ${create.status}`);
      }

      const created = await create.json();
      return created[0];

    } catch (err) {
      console.error('[❌ UsersService Error]', err);
      throw new InternalServerErrorException('Failed to create or find user');
    }
  }
}
