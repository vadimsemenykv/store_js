FROM node:9.11.1

WORKDIR /app

COPY . /app

RUN npm install
RUN npm install pm2 -g

CMD ["pm2-runtime", "provision/process.dev.yml"]
#CMD ["npm", "run", "start:server:dev"]