FROM node:20-alpine

ARG SENTRY_HOST
ARG SENTRY_PROJECT_IDS

WORKDIR /usr/sentry-tunnel-handler
COPY ["./package.json", "./package-lock.json", "./"]
RUN npm install
COPY ./ ./

ENV HOST=0.0.0.0
ENV PORT=3000
ENV SENTRY_HOST=$SENTRY_HOST
ENV SENTRY_PROJECT_IDS=$SENTRY_PROJECT_IDS

EXPOSE 3000
CMD ["npm", "start"]
