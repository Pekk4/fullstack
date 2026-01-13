FROM node:25 AS builder

WORKDIR /app

COPY . .

RUN npm ci

ARG REACT_APP_BACKEND_URL=/api/persons
ENV REACT_APP_BACKEND_URL=$REACT_APP_BACKEND_URL

RUN npm run build

FROM nginx:latest

COPY --from=builder /app/build /usr/share/nginx/html
