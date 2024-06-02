require('dotenv').config();
const cors = require('cors');
const express = require('express');

const { SENTRY_HOST, SENTRY_PROJECT_IDS, PORT, HOST } = require('./env');

const app = express();

app.use(cors());
app.use(express.raw({ limit: '100mb', type: () => true }));

app.post('/', async (request, response, _next) => {
  try {
    const envelope = request.body;

    const piece = envelope.slice(0, envelope.indexOf("\n"));
    const header = JSON.parse(piece);
    const dsn = new URL(header["dsn"]);
    const projectId = dsn.pathname?.replace("/", "");

    if (dsn.hostname !== SENTRY_HOST) {
      throw new Error(`Invalid sentry hostname: ${dsn.hostname}`);
    }

    if (!SENTRY_PROJECT_IDS.includes(projectId)) {
      throw new Error(`Invalid sentry project id: ${projectId}`);
    }

    const upstreamSentryURL = `https://${SENTRY_HOST}/api/${projectId}/envelope/`;
    await fetch(upstreamSentryURL, { method: "POST", body: envelope });

    return response.status(200).json({});
  } catch (error) {
    console.error(error);
    return response.status(500);
  }
})

app.listen(PORT, HOST, () => {
  console.info(`sentry-tunnel-handler listening on http://${HOST}:${PORT}`);
})
