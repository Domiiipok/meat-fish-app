# Dockerfile

FROM node:20

WORKDIR /app

# Установка зависимостей
COPY package*.json ./
RUN npm install

# Копируем остальной код
COPY . .

# Компиляция
RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main"]
