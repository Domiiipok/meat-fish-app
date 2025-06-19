FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

# Добавим установку прав доступа для Nest CLI
RUN chmod +x ./node_modules/.bin/nest

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main.js"]
