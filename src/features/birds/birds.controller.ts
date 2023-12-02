import { Controller, Get, Param } from '@nestjs/common';
import { BirdsService } from './birds.service';
import { Bird } from './bird';
import { ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('birds')
@Controller('birds')
export class BirdsController {
  constructor(private readonly birdService: BirdsService) {}

  @Get()
  getBirds(): Bird[] {
    return this.birdService.getBirds();
  }

  @Get('/:id')
  @ApiQuery({ name: 'id' })
  getBird(@Param('id') id): Bird {
    return this.birdService.getBirds().filter(x=> x.Id == id)[0];
  }
}
