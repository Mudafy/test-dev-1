FROM node:lts
LABEL maintainer="shibli049.com"
# set working directory
WORKDIR /app
# copy and install app dependencies
COPY package.json /app/package.json
RUN NODE_ENV=development npm install
# ENV NODE_ENV=${DOCKER_ENV}
RUN npm install -g @angular/cli@latest
# add app
COPY . /app
EXPOSE 4200
# start app
CMD ["ng",  "serve", "--host", "0.0.0.0"]