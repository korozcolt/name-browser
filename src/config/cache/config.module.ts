import { ConfigModule, ConfigService } from '@nestjs/config';

import { Module } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisConfigService } from './config.service';

@Module({
  imports: [ConfigModule],
  providers: [
    RedisConfigService,
    {
      provide: 'REDIS_CLIENT',
      useFactory: async (configService: ConfigService) => {
        const redisClient = new Redis({
          host: process.env.REDIS_HOST,
          port: +process.env.REDIS_PORT,
          password: process.env.REDIS_PASSWORD,
        });

        return redisClient;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['REDIS_CLIENT', RedisConfigService],
})
export class RedisConfigModule {}
