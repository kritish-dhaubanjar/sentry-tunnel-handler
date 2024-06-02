# sentry-tunnel-handler
![image](https://github.com/kritish-dhaubanjar/sentry-tunnel/assets/25634165/b421c741-3088-409a-b607-83b54f17137a)

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
