FROM node:20

WORKDIR /app
COPY package.json .
RUN npm install

COPY . .
COPY next.config.ts ./next.config.ts


EXPOSE 5173

CMD ["npm", "run", "dev"]