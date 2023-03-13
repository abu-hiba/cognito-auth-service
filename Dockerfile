FROM node:16

WORKDIR /usr

COPY package*.json ./
COPY tsconfig.json ./

COPY . .

RUN npm install

RUN npm run build

FROM node:16

WORKDIR /usr

COPY package*.json ./

RUN npm ci --only=production

COPY --from=0 /usr/build .

RUN npm i pm2 -g

EXPOSE 80

CMD ["pm2-runtime", "index.js"]
