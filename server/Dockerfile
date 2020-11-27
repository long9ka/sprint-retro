FROM node:12
WORKDIR /usr/sprint-retro/server
COPY package.json ./
RUN yarn install --production 
COPY . .
EXPOSE 8000
CMD ["yarn", "start"]
