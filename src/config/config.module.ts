import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import AppConfig from './app.config';
import DatabaseConfig from './database.config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true,
      load: [() => ({ database: DatabaseConfig() ,app: AppConfig()})],
      
    }),
  ],
})
export class ConfigModule {}
