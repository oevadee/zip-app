FROM nginx:alpine
COPY ./nginx/nginx.conf /etc/nginx/conf.d/default.conf
COPY ./ssl/zip.waw.pl.chained.crt /etc/ssl/zip.waw.pl.chained.crt
COPY ./ssl/zip-private.key /etc/ssl/zip-private.key
COPY ./dist/ /usr/share/nginx/html
EXPOSE 80 443
CMD [ "nginx", "-g", "daemon off;" ]
