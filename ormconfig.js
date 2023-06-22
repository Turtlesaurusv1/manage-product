const path = require('path');
const SnakeNamingStrategy = require('typeorm-naming-strategies').SnakeNamingStrategy;

require('dotenv').config();

function env(key) {
  return process.env[key];
}

const baseConfig = {
  type: env('DB_CONNECTION'),
  host: env('DB_HOST'),
  port: env('DB_PORT'),
  username: env('DB_USERNAME'),
  password: env('DB_PASSWORD'),
  database: env('DB_DATABASE'),
  logging: ['warn', 'error'],
  entities: [
    path.join('dist', 'apps', 'lpp-api', 'src', 'database', 'entities', '*.entity{.js,.ts}'),
    path.join('dist', 'libs', 'core', 'src', 'entities', 'shared-entities', '*.entity{.js,.ts}'),
  ],
  migrations: [path.join('migrations', 'central-mgmt', '*{.js,.ts}')],
  cli: {
    migrationsDir: path.join('migrations', 'central-mgmt'),
  },
  dropSchema: env('DB_DROP_SCHEMA') === 'true',
  synchronize: env('DB_SYNCHRONIZE') === 'true',
  namingStrategy: new SnakeNamingStrategy(),
};

module.exports = baseConfig;
