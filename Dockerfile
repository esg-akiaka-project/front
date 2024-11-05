FROM node:20-alpine

WORKDIR /app

COPY harudoyak/package*.json ./

RUN npm install

COPY harudoyak/src ./src

RUN npm run build

EXPOSE 3000
CMD [ "npm", "run", "start" ]