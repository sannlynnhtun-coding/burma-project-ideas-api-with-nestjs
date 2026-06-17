import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { MyanmarMonthService } from './myanmar-months.service';
import { MyanmarMonth } from './myanmar-months';

@ApiTags('myanmar-months')
@Controller('myanmar-months')
export class MyanmarMonthController {
  constructor(private readonly service: MyanmarMonthService) {}

  @Get()
  getAll(): MyanmarMonth[] { return this.service.getAll(); }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  getById(@Param('id') id): MyanmarMonth {
    return this.service.getAll().filter(x => x.Id == id)[0];
  }
}
