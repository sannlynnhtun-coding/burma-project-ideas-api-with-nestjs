import { Controller, Get, Param } from '@nestjs/common';
import { BirdsService } from './birds.service';
import { Bird } from './bird';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('birds')
@Controller('birds')
export class BirdsController {
  constructor(private readonly birdService: BirdsService) {}

  @Get()
  getBirds(): Bird[] {
    return this.birdService.getBirds();
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  getBird(@Param('id') id): Bird {
    return this.birdService.getBirds().filter(x=> x.Id == id)[0];
  }
}
