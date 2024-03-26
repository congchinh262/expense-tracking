
FROM ubuntu AS temp
COPY package.json .
RUN sed -e 's/"version": "[0-9]\+\.[0-9]\+\.[0-9]\+\-\?\w*",/"version": "0.0.0",/' < package.json > package-v0.json

############################################
FROM node:21 as builder
WORKDIR /app
ENV DATABASE_PROVIDER postgres

COPY yarn.lock ./
COPY --from=temp package-v0.json package.json
RUN --mount=type=secret,id=npmrc,dst=/app/.npmrc yarn --frozen-lockfile

COPY . .
ENV NODE_ENV=production
RUN yarn build

RUN yarn install --prod

############################################
FROM node:21
WORKDIR /app

COPY --from=builder /app/dist dist
COPY --from=builder /app/prisma prisma
COPY --from=builder /app/node_modules node_modules
COPY --from=builder /app/package.json package.json

ENTRYPOINT [ "yarn" ]
CMD [ "start:prod" ]
