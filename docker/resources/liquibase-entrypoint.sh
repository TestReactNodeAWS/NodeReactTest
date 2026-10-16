#!/bin/sh
# Turns the shared DB_* settings into Liquibase's connection options, then runs the
# Liquibase command passed to the container (update by default).
set -e

: "${DB_HOST:?DB_HOST is required}"
: "${DB_USER:?DB_USER is required}"
: "${DB_PASSWORD:?DB_PASSWORD is required}"
: "${DB_DATABASE:?DB_DATABASE is required}"
DB_PORT="${DB_PORT:-5432}"

if [ "$#" -eq 0 ]; then
  set -- update
fi

exec liquibase \
  --url="jdbc:postgresql://${DB_HOST}:${DB_PORT}/${DB_DATABASE}" \
  --username="${DB_USER}" \
  --password="${DB_PASSWORD}" \
  --search-path=/liquibase/changelog \
  --changelog-file=changelog.master.xml \
  "$@"
