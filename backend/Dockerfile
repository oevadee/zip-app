FROM node:alpine
WORKDIR /opt/prod/
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build
CMD [ "node", "dist/app.js"]