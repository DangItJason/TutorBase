FROM node:lts

RUN mkdir -p /usr/src/app/backend
WORKDIR /usr/src/app/backend

COPY package*.json ./

RUN npm install --silent

COPY . .

EXPOSE 9000

CMD ["npm","run","dev"]