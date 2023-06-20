import { Module } from '@nestjs/common';
import { ServidorNombresService } from './servidorNombres.service';

@Module({
  providers: [ServidorNombresService],
  exports: [ServidorNombresService],
})
export class ServidorNombresModule {}
