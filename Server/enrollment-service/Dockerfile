FROM node:14

COPY package*.json ./
RUN npm install

COPY . .

COPY .env.development .env

CMD ["npm", "run", "dev"]