import { Injectable } from '@nestjs/common';
import { users } from '@/common';

@Injectable()
export class AppService {
  getHello (): string {
    console.log(users)
    return 'Hello World! \n';
  }
}
