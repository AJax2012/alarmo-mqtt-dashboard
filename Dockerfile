FROM node:18-alpine3.17 as builder

WORKDIR /app
COPY . /app

RUN yarn install
RUN yarn build
EXPOSE 7070

FROM nginx
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf