FROM node:13-alpine

WORKDIR /get-me-tested
COPY package.json package-lock.json ./
COPY src ./src
RUN npm ci


WORKDIR /get-me-tested/ui
COPY ui/src ./src
COPY ui/public ./public
COPY ui/*.* ./
RUN npm i && npm run build

WORKDIR /get-me-tested

CMD [ "npm", "start" ]
