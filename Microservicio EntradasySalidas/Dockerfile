FROM node:16

WORKDIR /usr/local/app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8082

CMD ["node", "src/index.js"]