FROM node:8.12.0-jessie

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY dist/ dist/

EXPOSE 8080

CMD ["node", "dist/index.js"]
