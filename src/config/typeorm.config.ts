import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export function typeOrmConfig(): TypeOrmModuleOptions {
  return {
    type: 'postgres',
    host: process.env.DATABASE_HOST || 'localhost',
    port:
      (process.env.DATABASE_PORT && parseInt(process.env.DATABASE_PORT, 10)) ||
      5432,
    username: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME || 'postgres',
    autoLoadEntities: true,
    synchronize: process.env.NODE_ENV !== 'production',
  };
}
