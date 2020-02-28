FROM node:latest

RUN mkdir /usr/app

WORKDIR /usr/app

RUN yarn add angular

COPY . .

# Puerto entorno dev
EXPOSE 4200
# Puerto livereload
EXPOSE 49153
# Puerto Test
EXPOSE 9876
# Puerto e2e
EXPOSE 49152
