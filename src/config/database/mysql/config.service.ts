import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('database.host');
  }

  get port(): number {
    return this.configService.get<number>('database.port');
  }

  get username(): string {
    return this.configService.get<string>('database.username');
  }

  get password(): string {
    return this.configService.get<string>('database.password');
  }

  get database(): string {
    return this.configService.get<string>('database.database');
  }
}
