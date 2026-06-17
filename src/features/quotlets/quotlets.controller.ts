import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { QuotletService } from './quotlets.service';
import { Quotlet } from './quotlets';

@ApiTags('quotlets')
@Controller('quotlets')
export class QuotletController {
  constructor(private readonly service: QuotletService) {}

  @Get()
  getAll(): Quotlet[] { return this.service.getAll(); }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  getById(@Param('id') id): Quotlet {
    return this.service.getAll().filter(x => x.Id == id)[0];
  }
}
