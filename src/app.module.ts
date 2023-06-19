import { AppConfigModule } from './config/app/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { DatabaseConfigModule } from './config/database/mysql/config.module';
import { Module } from '@nestjs/common';
import { RedisConfigModule } from './config/cache/config.module';
import { NamesModule } from './names/names.module';

@Module({
  imports: [
    AppConfigModule,
    ConfigModule.forRoot({ isGlobal: true, load: [] }),
    DatabaseConfigModule,
    RedisConfigModule,
    NamesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
