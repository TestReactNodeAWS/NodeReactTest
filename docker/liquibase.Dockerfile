# syntax=docker/dockerfile:1
# Build from the repo root: docker build -f docker/liquibase.Dockerfile .
# Run: docker run --rm -e DB_HOST=... -e DB_USER=... -e DB_PASSWORD=... -e DB_DATABASE=... <image> update
FROM liquibase/liquibase:5.0.4-alpine

USER root
# Apply Alpine security fixes released since the base image was built, and remove what this
# project doesn't use: the package manager (lpm) and drivers for databases other than Postgres.
RUN apk upgrade --no-cache \
  && rm -f /liquibase/bin/lpm \
  && find /liquibase -name '*.jar' \( -iname '*mssql*' -o -iname '*snowflake*' -o -iname '*oracle*' \
       -o -iname '*ojdbc*' -o -iname '*mariadb*' -o -iname '*db2*' -o -iname '*jcc*' \) -delete

# Liquibase 5 doesn't bundle database drivers. The checksum makes the build fail if the
# download is ever changed. To upgrade, update the version and the sha256 together.
ADD --checksum=sha256:6e0e4cc2d8cae902084f8a2b18728b073a6fd9d1f87c9d8bff8f298c18185b93 \
    https://repo1.maven.org/maven2/org/postgresql/postgresql/42.7.13/postgresql-42.7.13.jar \
    /liquibase/lib/postgresql-42.7.13.jar
RUN chmod 644 /liquibase/lib/postgresql-42.7.13.jar

COPY packages/liquibase/changelogs /liquibase/changelog
COPY --chmod=755 docker/resources/liquibase-entrypoint.sh /liquibase/lab-entrypoint.sh

USER liquibase
ENTRYPOINT ["/liquibase/lab-entrypoint.sh"]
CMD ["update"]
