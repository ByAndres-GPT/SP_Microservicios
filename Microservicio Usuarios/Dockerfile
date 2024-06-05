FROM node:16

WORKDIR /usr/local/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8083

CMD ["node", "src/index.js"]