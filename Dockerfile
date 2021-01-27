FROM nginx:stable-alpine
WORKDIR /app
COPY dist/build/h5 /usr/share/nginx/html
COPY default.template /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

