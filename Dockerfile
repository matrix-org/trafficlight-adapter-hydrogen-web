FROM mcr.microsoft.com/playwright:v1.32.0-focal

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./

RUN yarn install

COPY . ./

RUN yarn install

# Pre-compile typescript
RUN yarn run docker-build

CMD ["xvfb-run", "yarn", "run", "docker-run"]
