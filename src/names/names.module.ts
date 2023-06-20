import { Module } from '@nestjs/common';
import { Name } from './entities/name.entity';
import { NamesController } from './controllers/names.controller';
import { NamesService } from './services/names.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { ServidorNombresModule } from 'src/integrations/names/servidorNombres.module';

@Module({
  imports: [SequelizeModule.forFeature([Name]), ServidorNombresModule],
  controllers: [NamesController],
  providers: [NamesService],
})
export class NamesModule {}
