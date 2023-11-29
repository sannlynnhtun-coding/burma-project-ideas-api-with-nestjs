import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getUsers(): string[] { // Change return type to string[](stirng Array) 
    return ['userOne', 'userTwo'];
  }
}
