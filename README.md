# sentry-tunnel-handler
![sentry-tunnel-handler](https://github.com/Vyaguta/sentry-tunnel-handler/assets/25634165/8b9c9cee-325c-4900-8952-a2416f11fa2b)

# Docker
**a. Build Docker Image**
```shell
docker build \
--build-arg="SENTRY_HOST=*******.ingest.us.sentry.io" \
--build-arg="SENTRY_PROJECT_IDS=4***************,5***************" \
. -t sentry-tunnel-handler:latest
```

*Build Arguments:*
- `SENTRY_HOST` (`*******.ingest.us.sentry.io`)
- `SENTRY_PROJECT_IDS` (`4***************,5***************`)

**b. Run Docker Container**
```shell
docker run \
-e SENTRY_HOST="*******.ingest.us.sentry.io" \
-e SENTRY_PROJECT_IDS="4***************" \
-p 3000:3000 sentry-tunnel-handler:latest
```

*Environment Variables:*
- `SENTRY_HOST` (`*******.ingest.us.sentry.io`)
- `SENTRY_PROJECT_IDS` (`4***************,5***************`)
