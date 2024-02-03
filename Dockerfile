FROM node:18-alpine3.17 as builder

WORKDIR /app
COPY . /app

RUN yarn install
RUN yarn build
EXPOSE 7070

FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/nginx.conf

CMD ["nginx", "-g", "daemon off;"]