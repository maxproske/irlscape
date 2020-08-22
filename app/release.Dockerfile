FROM node:13-alpine

WORKDIR /app

COPY package.json .

RUN yarn install --production

COPY src ./src
COPY public ./public

RUN yarn build

CMD yarn start