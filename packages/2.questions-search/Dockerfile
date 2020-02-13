FROM node:9 as builder

COPY ./ /app/

WORKDIR /app

RUN yarn install

ENTRYPOINT yarn start:nohmr --host 0.0.0.0 --port 4200