FROM node:20

WORKDIR /app
COPY package.json .
RUN npm install  --legacy-peer-deps

COPY . .
COPY vite.config.js ./vite.config.js

EXPOSE 5173

CMD ["npm", "run", "dev"]