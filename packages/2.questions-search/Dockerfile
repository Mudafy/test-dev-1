# FROM node:13 as builder

# COPY ./ /app/

# WORKDIR /app

# RUN yarn install

# ENTRYPOINT yarn start-ssr --host 0.0.0.0 --port 4000

### STAGE 1: Build ###

# We label our stage as 'builder'
FROM node:8-alpine as builder

COPY package*.json ./

RUN npm set progress=false && npm config set depth 0 && npm cache clean --force

## Storing node modules on a separate layer will prevent unnecessary npm installs at each build
RUN npm i && mkdir /ng-app && cp -R ./node_modules ./ng-app

WORKDIR /ng-app

COPY . .

## Build the angular app in production mode and store the artifacts in dist folder
RUN yarn build:ssr


### STAGE 2: Setup ###

FROM nginx:1.13.3-alpine

## Copy our default nginx config
COPY nginx/default.conf /etc/nginx/conf.d/

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

## From 'builder' stage copy over the artifacts in dist folder to default nginx public folder
COPY --from=builder /ng-app/dist/browser /usr/share/nginx/html

#WORKDIR /dist/browser
CMD ["nginx", "-g", "daemon off;"]