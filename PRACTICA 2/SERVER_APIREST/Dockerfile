FROM node:latest
WORKDIR /usr/src/nodejs
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN mkdir -p /elements/procs

CMD ["node", "server.js"]
