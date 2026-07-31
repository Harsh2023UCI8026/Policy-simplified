import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get<string>('DATABASE_URL');
        if (databaseUrl) {
          return {
            type: 'postgres',
            url: databaseUrl,
            autoLoadEntities: true,
            synchronize: config.get<string>('NODE_ENV') !== 'production',
          } as any;
        }
        // Fallback to SQLite for local development/testing
        return {
          type: 'sqlite',
          database: 'dev.db',
          autoLoadEntities: true,
          synchronize: true,
        } as any;
      },
    }),
  ],
})
export class DatabaseModule {}
