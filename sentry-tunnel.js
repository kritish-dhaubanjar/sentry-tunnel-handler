const http = require('http');
const { URL } = require('url');

const SENTRY_HOST = "o******.ingest.us.sentry.io";
const SENTRY_PROJECT_IDS = ["****************"];

const server = http.createServer(async (request, response) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', 'OPTIONS, POST');
  response.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (request.method === 'OPTIONS') {
    response.writeHead(204);
    response.end();
    return;
  }

  if (request.method === 'POST' && request.url === '/') {
    let envelope = '';

    request.on('data', chunk => envelope += chunk);

    request.on('end', async () => {
      try {
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

        const upstreamSentryUrl = `https://${SENTRY_HOST}/api/${projectId}/envelope/`;

        await fetch(upstreamSentryUrl, { method: "POST", body: envelope });

        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({}));
      } catch (error) {
        console.error("Error tunneling to sentry", error);
        response.writeHead(500, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: "Error tunneling to sentry" }));
      }
    });
  } else {
    response.writeHead(404, { 'Content-Type': 'text/plain' });
    response.end('Not Found');
  }
});

server.listen(3003, () => {
  console.log('Server is listening on port 3003');
});
