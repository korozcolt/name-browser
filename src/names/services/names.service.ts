import { Body, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Name } from '../entities/name.entity';
import { CreateNameDto } from '../dto/create-name.dto';
import { UpdateNameDto } from '../dto/update-name.dto';
import { ServidorNombresService } from 'src/integrations/names/servidorNombres.service';

@Injectable()
export class NamesService {
  constructor(
    @InjectModel(Name)
    private nameModel: typeof Name,
    private servidorNombresService: ServidorNombresService,
  ) {}

  async create(createNameDto: CreateNameDto): Promise<Name> {
    const newName = new Name({ ...createNameDto, responseTime: new Date() });
    return await newName.save();
  }

  async findAll(): Promise<Name[]> {
    return await this.nameModel.findAll();
  }

  async findByDni(dni: number): Promise<Name> {
    const name = await this.nameModel.findOne({ where: { dni } });

    if (name) {
      return name;
    }

    const nombreServidor = await this.servidorNombresService.getName(dni);
    const newName = await this.create({
      dni,
      name: nombreServidor || 'NO ENCONTRADA',
      responseTime: new Date(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return newName;
  }

  async findByDnis(dnis: number[]): Promise<Name[]> {
    const names: Name[] = [];
    const promises: Promise<void>[] = [];

    for (const dni of dnis) {
      const namePromise = this.findByDni(dni)
        .then((name) => {
          names.push(name);
        })
        .catch((error) => {
          console.error(`Error retrieving name for dni ${dni}:`, error);
        });

      promises.push(namePromise);
    }

    await Promise.all(promises);

    return names;
  }

  async findOne(id: number): Promise<Name> {
    return await this.nameModel.findByPk(id);
  }

  async update(id: number, updateNameDto: UpdateNameDto): Promise<Name> {
    const nameToUpdate = await this.nameModel.findByPk(id);
    if (!nameToUpdate) {
      throw new Error(`Name with ID ${id} does not exist.`);
    }
    await nameToUpdate.update(updateNameDto);
    return nameToUpdate;
  }

  async remove(id: number): Promise<void> {
    await this.nameModel.destroy({ where: { id } });
  }
}
