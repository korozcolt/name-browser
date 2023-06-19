import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RedisConfigService {
  constructor(private configService: ConfigService) {}

  get host(): string {
    return this.configService.get<string>('redis.host');
  }

  get port(): number {
    return this.configService.get<number>('redis.port');
  }

  get password(): string {
    return this.configService.get<string>('redis.password');
  }
}
