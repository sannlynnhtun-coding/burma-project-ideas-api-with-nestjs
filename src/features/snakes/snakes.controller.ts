import { Controller, Get, Param, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { SnakeService } from './snakes.service';
import { Snake } from './snake';
import { buildAssetUrl } from '../../common/asset-url';

@ApiTags('snakes')
@Controller('snakes')
export class SnakesController {

    constructor(private readonly snakeService: SnakeService) {}

    @Get()
    getSnakes(@Req() request: Request): Snake[] {
      return this.snakeService.getSnakes().map((snake) => ({
        ...snake,
        ImageUrl: buildAssetUrl(request, snake.ImageUrl),
      }));
    }
  
    @Get('/:id')
    @ApiParam({ name: 'id' })
    getBird(@Req() request: Request, @Param('id') id): Snake[] {
      return this.snakeService
        .getSnakes()
        .filter((x) => x.Id == id)
        .map((snake) => ({
          ...snake,
          ImageUrl: buildAssetUrl(request, snake.ImageUrl),
        }));
    }

}
