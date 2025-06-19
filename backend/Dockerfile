FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

# Убедимся, что файлы на которых работает Nest CLI доступны для выполнения
RUN chmod +x ./node_modules/.bin/npx
RUN chmod +x ./node_modules/.bin/nest

COPY . .

RUN npm run build

EXPOSE 3000
CMD ["node", "dist/main.js"]
