FROM node:8.12.0-jessie

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm build

EXPOSE 3000

CMD ["node", "dist_server/index.js"]
