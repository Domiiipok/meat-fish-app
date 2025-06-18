FROM node:18

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

# ❗ Фикс: дать права на выполнение nest
RUN chmod +x ./node_modules/.bin/nest

# ❗ Теперь можно безопасно билдить
RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]
