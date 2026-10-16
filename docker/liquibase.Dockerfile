# Build from the repo root: docker build -f docker/liquibase.Dockerfile .
# Run: docker run --rm -e DB_HOST=... -e DB_USER=... -e DB_PASSWORD=... -e DB_DATABASE=... <image> update
FROM liquibase/liquibase:4.29

COPY packages/liquibase/changelogs /liquibase/changelog
COPY --chmod=755 docker/resources/liquibase-entrypoint.sh /liquibase/lab-entrypoint.sh

ENTRYPOINT ["/liquibase/lab-entrypoint.sh"]
CMD ["update"]
