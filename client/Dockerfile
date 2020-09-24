FROM node:14.11.0-alpine
RUN mkdir -p /www/app/bwitter/client
WORKDIR /www/app/bwitter/client

COPY package.json /www/app/bwitter/client/
COPY package-lock.json /www/app/bwitter/client/

RUN npm i

COPY . /www/app/bwitter/client/

CMD ["npm", "start"]
