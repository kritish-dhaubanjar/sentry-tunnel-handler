# sentry-tunnel-handler
![image](https://github.com/kritish-dhaubanjar/sentry-tunnel/assets/25634165/b421c741-3088-409a-b607-83b54f17137a)

# Docker
**a. Build Docker Image**
```shell
docker build . -t sentry-tunnel-handler:latest
```

*Build Arguments:*
- `PORT_ARG` (default: `3000`)
- `HOST_ARG` (default: `0.0.0.0`)
- `SENTRY_HOST_ARG` (`*******.ingest.us.sentry.io`)
- `SENTRY_PROJECT_IDS_ARG` (`4***************,5***************`)

**b. Run Docker Container**
```shell
docker run -p 3000:3000 sentry-tunnel-handler:latest
```

*Environment Variables:*
- `PORT` (default: `3000`)
- `HOST` (default: `0.0.0.0`)
- `SENTRY_HOST` (`*******.ingest.us.sentry.io`)
- `SENTRY_PROJECT_IDS` (`4***************,5***************`)
