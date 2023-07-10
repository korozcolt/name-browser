import { Module } from '@nestjs/common';
import { Name } from './entities/name.entity';
import { NamesController } from './controllers/names.controller';
import { NamesService } from './services/names.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { NamesServerModule } from 'src/integrations/names/namesServerModule';

@Module({
  imports: [SequelizeModule.forFeature([Name]), NamesServerModule],
  controllers: [NamesController],
  providers: [NamesService],
})
export class NamesModule {}
