FROM node:9.11.1

WORKDIR /app

COPY ../.. /app
COPY ../provision/process.yml /app/process.yml

RUN npm install
RUN npm install pm2 -g

CMD ["pm2-runtime", "process.yml"]