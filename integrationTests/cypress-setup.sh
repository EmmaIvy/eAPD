#!/usr/bin/env sh

export NODE_ENV=development

docker-compose exec api npm run migrate
docker-compose exec api npm run seed

npx cypress $1
