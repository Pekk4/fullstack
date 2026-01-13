FROM node:25 AS builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm test

ARG VITE_BACKEND_URL=/api
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL

RUN npm run build

FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html
