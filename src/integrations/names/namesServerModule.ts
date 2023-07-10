import { Module } from '@nestjs/common';
import { NamesServerService } from './namesServer.service';

@Module({
  providers: [NamesServerService],
  exports: [NamesServerService],
})
export class NamesServerModule {}
