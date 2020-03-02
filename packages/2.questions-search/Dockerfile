# Node.js image to build and compile Angular
FROM node:latest as node
WORKDIR /app
COPY ./ /app/
RUN npm install
RUN npm run build -- --prod

# Nginx image, to have only the compiled app, ready for production with Nginx
FROM nginx:alpine
COPY --from=node /app/dist/test-questions-search /usr/share/nginx/html