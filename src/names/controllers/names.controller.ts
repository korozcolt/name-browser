import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { NamesService } from '../services/names.service';
import { CreateNameDto } from '../dto/create-name.dto';
import { UpdateNameDto } from '../dto/update-name.dto';

@Controller('names')
export class NamesController {
  constructor(private readonly namesService: NamesService) {}

  @Post()
  create(@Body() createNameDto: CreateNameDto) {
    return this.namesService.create(createNameDto);
  }

  @Get()
  findAll() {
    return this.namesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.namesService.findOne(+id);
  }

  @Get('/dni/:dni')
  findByDni(@Param('dni') dni: number) {
    return this.namesService.findByDni(dni);
  }

  @Post('/dnis')
  async findByDnis(@Body() body: { dnis: number[] }) {
    const dnis = body.dnis;
    return this.namesService.findByDnis(dnis);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNameDto: UpdateNameDto) {
    return this.namesService.update(+id, updateNameDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.namesService.remove(+id);
  }
}
