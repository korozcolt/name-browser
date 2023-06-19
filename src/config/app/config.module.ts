import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppConfigService } from './config.service';
import { Module } from '@nestjs/common';
import configuration from './configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  providers: [ConfigService, AppConfigService],
  exports: [ConfigService, AppConfigService],
})
export class AppConfigModule {}
