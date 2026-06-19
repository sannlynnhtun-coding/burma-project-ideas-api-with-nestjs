import { Controller, Get, Param, Req } from '@nestjs/common';
import type { Request } from 'express';
import { BirdsService } from './birds.service';
import { Bird } from './bird';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { buildAssetUrl } from '../../common/asset-url';

@ApiTags('birds')
@Controller('birds')
export class BirdsController {
  constructor(private readonly birdService: BirdsService) {}

  @Get()
  getBirds(@Req() request: Request): Bird[] {
    return this.birdService.getBirds().map((bird) => ({
      ...bird,
      ImagePath: buildAssetUrl(request, bird.ImagePath),
    }));
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  getBird(@Req() request: Request, @Param('id') id): Bird {
    const bird = this.birdService.getBirds().filter((x) => x.Id == id)[0];

    if (!bird) return bird;

    return {
      ...bird,
      ImagePath: buildAssetUrl(request, bird.ImagePath),
    };
  }
}
