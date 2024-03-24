FROM node:16

WORKDIR /usr/src/app

COPY --chown=node:node . /usr/src/app
COPY package*.json ./


RUN npm install

COPY . .

USER node
# Run nodemon
CMD ["npm", "run", "dev"]
