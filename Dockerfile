FROM node:8.12.0-jessie

WORKDIR /server

COPY package*.json ./

RUN npm install

COPY dist_server/ .

EXPOSE 8080

CMD ["node", "index.js"]
