FROM node:16

WORKDIR /usr/src/app

COPY build/ ./

COPY . .

EXPOSE 8080

CMD [ "node", "build/index.js" ]