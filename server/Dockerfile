FROM node:16.13.1-alpine

WORKDIR /backend

COPY package.json .

RUN yarn

COPY . .

EXPOSE 5000

CMD ["npm","start"]