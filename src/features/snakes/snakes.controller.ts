import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { SnakeService } from './snakes.service';
import { Snake } from './snake';

@ApiTags('snakes')
@Controller('snakes')
export class SnakesController {

    constructor(private readonly snakeService: SnakeService) {}

    @Get()
    getSnakes(): Snake[] {
      return this.snakeService.getSnakes();
    }
  
    @Get('/:id')
    @ApiParam({ name: 'id' })
    getBird(@Param('id') id): Snake[] {
      return this.snakeService
        .getSnakes()
        .filter((x) => x.Id == id);
    }

}
