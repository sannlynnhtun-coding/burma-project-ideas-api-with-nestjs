import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { IncompatibleFoodService } from './incompatible-food.service';
import { IncompatibleFood } from './incompatible-food';

@ApiTags('incompatible-food')
@Controller('incompatible-food')
export class IncompatibleFoodController {
  constructor(private readonly service: IncompatibleFoodService) {}

  @Get()
  getAll(): IncompatibleFood[] { return this.service.getAll(); }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  getById(@Param('id') id): IncompatibleFood {
    return this.service.getAll().filter(x => x.Id == id)[0];
  }
}
