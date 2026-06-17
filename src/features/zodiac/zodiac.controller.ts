import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ZodiacSignService } from './zodiac.service';
import { ZodiacSign } from './zodiac';

@ApiTags('zodiac')
@Controller('zodiac')
export class ZodiacSignController {
  constructor(private readonly service: ZodiacSignService) {}

  @Get()
  getAll(): ZodiacSign[] { return this.service.getAll(); }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  getById(@Param('id') id): ZodiacSign {
    return this.service.getAll().filter(x => x.Id == id)[0];
  }
}
