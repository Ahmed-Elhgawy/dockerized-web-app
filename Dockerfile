FROM node:lts-alpine3.21

RUN addgroup -S app && adduser -S app -G app

WORKDIR /app
COPY . .

RUN chown -R app:app /app

USER app

RUN npm ci --no-audit --silent

ARG MONGO_HOST
ARG MONGO_DB
ARG MONGO_USER
ARG MONGO_PASS

ENV MONGO_HOST=$MONGO_HOST \
    MONGO_DB=$MONGO_DB \
    MONGO_USER=$MONGO_USER \
    MONGO_PASS=$MONGO_PASS

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]
