FROM node:latest
WORKDIR /usr/src/nodejs
COPY package*.json ./
COPY . .
RUN npm install --save
EXPOSE 3000
RUN mkdir -p /elements/procs

CMD ["node", "server.js"]
