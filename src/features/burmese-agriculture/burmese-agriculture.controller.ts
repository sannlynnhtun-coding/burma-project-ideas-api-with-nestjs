import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { BurmeseAgricultureService } from './burmese-agriculture.service';
import { BurmeseAgriculture } from './burmese-agriculture';

@ApiTags('burmese-agriculture')
@Controller('burmese-agriculture')
export class BurmeseAgricultureController {
  constructor(private readonly service: BurmeseAgricultureService) {}

  @Get()
  getAll(): BurmeseAgriculture[] { return this.service.getAll(); }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  getById(@Param('id') id): BurmeseAgriculture {
    return this.service.getAll().filter(x => x.Id == id)[0];
  }
}
