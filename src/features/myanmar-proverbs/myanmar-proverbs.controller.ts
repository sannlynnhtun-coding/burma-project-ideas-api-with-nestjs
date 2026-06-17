import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { MyanmarProverbService } from './myanmar-proverbs.service';
import { MyanmarProverb } from './myanmar-proverbs';

@ApiTags('myanmar-proverbs')
@Controller('myanmar-proverbs')
export class MyanmarProverbController {
  constructor(private readonly service: MyanmarProverbService) {}

  @Get()
  getAll(): MyanmarProverb[] { return this.service.getAll(); }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  getById(@Param('id') id): MyanmarProverb {
    return this.service.getAll().filter(x => x.ProverbId == id)[0];
  }
}
