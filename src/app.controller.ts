import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('users')
  getUsers(): string[] { // Change return type to string[](stirng Array) 
     // Change the service method name to getUsers
     return this.appService.getUsers(); 
  }
}
