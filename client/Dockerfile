FROM node:16.13.1-alpine as react-production-build

WORKDIR /frontend

COPY package.json .

RUN yarn

COPY . .

RUN yarn build

FROM nginx:alpine 

# Copy custom ngnix conf file
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Copy from the stage 1
COPY --from=react-production-build /frontend/build /usr/share/nginx/html

EXPOSE 80