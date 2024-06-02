const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 3000;
const SENTRY_HOST = process.env.SENTRY_HOST;
const SENTRY_PROJECT_IDS = process.env.SENTRY_PROJECT_IDS?.split(',');

module.exports = {
  HOST,
  PORT,
  SENTRY_HOST,
  SENTRY_PROJECT_IDS,
}
