FROM node:latest as builer
WORKDIR /opt/prod/
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build

FROM nginx:alpine
COPY --from=builer /opt/prod/dist/ /usr/share/nginx/html
COPY --from=builer /opt/prod/nginx/nginx.conf /etc/nginx/conf.d/default.conf