import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ⛔️ Важно: разрешаем CORS с фронта
  app.enableCors({
    origin: 'https://meat-fish-frontend.onrender.com', // или '*', но лучше точно
    credentials: true,
  });

  await app.listen(3000);
}
bootstrap();
