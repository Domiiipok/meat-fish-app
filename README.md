# Meat & Fish WebApp — Fullstack

## 📦 Состав
- **frontend/** — React + Tailwind + Telegram SDK
- **backend/** — NestJS API, авторизация по Telegram initData
- **docker-compose** — fullstack окружение + PostgreSQL

## 🚀 Запуск

1. Скопируй `.env.example` в `.env` и укажи реальные ключи
2. Собери и запусти:
   ```bash
   docker-compose up --build
   ```

3. Перейди в браузер:
   - Frontend: http://localhost:5173
   - Backend API: http://localhost:3000/api

## 🧠 Особенности

- Авторизация через Telegram initData (подпись проверяется на сервере)
- Хранение заказов и гостей в PostgreSQL (через Supabase)
- Можно подключить Telegram Bot позже
