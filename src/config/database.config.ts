import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { join } from 'path';

export default () =>
  ({
    type: process.env.DB_CONNECTION,
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    entities: [
      join(__dirname, '..', 'database', 'entities', '*.entity{.js,.ts}'),
    ],
    synchronize: process.env.DB_SYNCHRONIZE.toLocaleLowerCase() === 'true',
    dropSchema: process.env.DB_DROP_SCHEMA.toLocaleLowerCase() === 'true',
    migrationsRun: process.env.DB_MIGRATIONS_RUN.toLocaleLowerCase() === 'true',
    namingStrategy: new SnakeNamingStrategy(),
    logging: false,
  } as TypeOrmModuleOptions);
