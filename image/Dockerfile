FROM nginx:alpine
COPY target/nginx.conf /etc/nginx/conf.d/default.conf
COPY target/dist/identity-management /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
