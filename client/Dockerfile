# syntax=docker/dockerfile:1
FROM node:14.17.6-alpine

WORKDIR /opt/app/client/

COPY package*.json ./

RUN npm ci

COPY . .

EXPOSE 3001
CMD ["npm", "start]
