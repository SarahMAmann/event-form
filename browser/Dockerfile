FROM node:14.15-stretch-slim

WORKDIR /usr/app

COPY ./package.json ./
COPY ./package-lock.json ./

RUN npm install -g @angular/cli@9.1.1
RUN npm install

COPY ./angular.json ./
COPY ./tsconfig.json ./
COPY ./tslint.json ./

ENTRYPOINT ["ng", "serve"]
