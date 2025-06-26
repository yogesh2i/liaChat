FROM node:alpine

WORKDIR /app/backend

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 8000

CMD ["npm", "start"]
