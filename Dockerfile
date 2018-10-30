FROM node:8.12.0-jessie

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:client
RUN npm run build:server

EXPOSE 3000

CMD ["node", "dist_server/index.js"]
