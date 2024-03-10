FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
COPY yarn.lock ./
RUN yarn install
COPY . .
RUN yarn lint
RUN yarn prisma generate
RUN yarn run build
CMD ["sh" "./launchBoth.sh"]
