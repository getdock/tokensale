FROM node:8
WORKDIR /app
EXPOSE 80
CMD ["/app/start.sh"]

RUN apt-get -qq update && \
    apt-get -qq install nginx curl unzip

ARG COMMIT
ENV COMMIT ${COMMIT}


# Precache dependencies
COPY package.json package.json
COPY yarn.lock yarn.lock
RUN yarn --pure-lockfile

COPY . /app

RUN yarn build
