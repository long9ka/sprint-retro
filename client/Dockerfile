FROM node:12 as build-stage
WORKDIR /usr/sprint-retro/client
COPY . .
RUN yarn install
CMD ["yarn", "start"]
