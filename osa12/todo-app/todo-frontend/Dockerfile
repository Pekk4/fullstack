FROM node:25 AS builder

WORKDIR /app

COPY . .

RUN npm ci

RUN npm test

ENV VITE_BACKEND_URL=http://localhost:3000

RUN npm run build

FROM nginx:latest

COPY --from=builder /app/dist /usr/share/nginx/html
