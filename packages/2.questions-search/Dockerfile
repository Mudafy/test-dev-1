#Base image
FROM node:12.2.0

#Set working directory
WORKDIR /app

#Copy project data
COPY package.json yarn.lock angular.json tsconfig.json tslint.json /app/

#Generate project files
RUN yarn install
EXPOSE 4200

#Start app when the container is run
CMD yarn start
