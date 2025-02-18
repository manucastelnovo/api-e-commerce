FROM library/node:18-alpine as base

RUN npm i -g pnpm

FROM base AS dependencies

WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./
RUN pnpm install

FROM base as build

WORKDIR /usr/src/app
COPY . .
COPY --from=dependencies /usr/src/app/node_modules ./node_modules
RUN pnpm run build
RUN pnpm prune --prod

FROM base as deploy

WORKDIR /usr/src/app
COPY --from=build /usr/src/app/dist ./dist/
COPY --from=build /usr/src/app/node_modules ./node_modules

EXPOSE 3000

CMD ["pnpm", "start:prod"]
