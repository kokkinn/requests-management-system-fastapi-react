FROM node:alpine as node_image
WORKDIR /app
COPY ../client/package.json .
RUN npm install
COPY ../client .
RUN npm run build

FROM nginx
COPY --from=node_image /app/build/ /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf


