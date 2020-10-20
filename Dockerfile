FROM node:10-alpine as BUILD
LABEL maintainer="luca.decarne@unito.it"

RUN mkdir -p /opt/server/bc-eavesdropper
WORKDIR /opt/server/bc-eavesdropper
COPY package*.json ./
RUN apk update && apk upgrade && apk add --no-cache bash git openssh python make g++
RUN npm install --silent && npm i -g --silent typescript@latest && npm i websocket
COPY . .
RUN tsc

FROM node:10-alpine
WORKDIR /opt/server/bc-eavesdropper
COPY --from=BUILD /opt/server/bc-eavesdropper/ .
RUN  npm install pm2 -g
EXPOSE 4000
ARG environment
ENV NODE_ENV=$environment
CMD ["npm", "start"]