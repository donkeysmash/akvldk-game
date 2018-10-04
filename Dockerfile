FROM node:8.12.0-jessie

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY dist_server/ dist_server/

EXPOSE 8080

CMD ["node", "dist_server/index.js"]
