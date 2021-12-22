FROM node:16

WORKDIR /usr/src/app

ENV DATABASE_URL = mongodb+srv://admin:admin2021@cluster0.rv6oo.mongodb.net/arcadeweb?retryWrites=true&w=majority

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 4040

CMD ["npm", "start"]