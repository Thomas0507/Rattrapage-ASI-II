FROM node:20

WORKDIR /app

COPY package*.json ./
COPY tsoa.json ./


RUN npm install && npm cache clean --force


EXPOSE 3000
CMD ["npm", "run", "dev"]