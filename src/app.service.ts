import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    const x = 6;
    console.log('object', x);
    return 'Hello World!';
  }
}
