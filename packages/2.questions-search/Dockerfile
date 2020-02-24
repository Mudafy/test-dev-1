#Base image
FROM node:12.2.0

#Set working directory
WORKDIR /app

#Add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY angular.json /app/angular.json
COPY tsconfig.json /app/tsconfig.json
COPY tslint.json /app/tslint.json

RUN yarn install
RUN npm install
RUN npm install -g @angular/cli@7.3.9
RUN npm install node-sass

COPY . /app

EXPOSE 4200

#Start app when the container is run
CMD yarn start
