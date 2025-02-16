FROM node:22.14.0-alpine as development

WORKDIR /app

COPY package*.json ./
COPY prisma ./prisma/
COPY .env ./
COPY tsconfig.json ./

RUN npm ci

COPY . .

RUN addgroup -S codemask && adduser -S codemask -G codemask

RUN chown -R codemask:codemask /app

USER codemask

EXPOSE 3000

CMD [ "npm", "run", "start:dev" ]