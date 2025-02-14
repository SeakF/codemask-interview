FROM node:18.18.0-alpine as development

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./

RUN npm ci

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]