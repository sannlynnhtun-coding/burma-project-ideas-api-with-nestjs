import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Start')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
