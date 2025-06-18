import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MenuModule } from './menu/menu.module';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [AuthModule, UsersModule, MenuModule, OrdersModule],
})
export class AppModule {}
