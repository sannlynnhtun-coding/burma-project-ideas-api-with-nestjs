import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import {
  MissingHistoricalRecordBook,
  MissingHistoricalRecordPage,
} from './missing-historical-records';
import { MissingHistoricalRecordsService } from './missing-historical-records.service';

@ApiTags('missing-historical-records')
@Controller('missing-historical-records')
export class MissingHistoricalRecordsController {
  constructor(private readonly service: MissingHistoricalRecordsService) {}

  @Get()
  getAll(): MissingHistoricalRecordBook[] {
    return this.service.getAll();
  }

  @Get(':id/pages')
  @ApiParam({ name: 'id' })
  getPages(@Param('id', ParseIntPipe) id: number): MissingHistoricalRecordPage[] {
    return this.service.getPages(id);
  }

  @Get(':id')
  @ApiParam({ name: 'id' })
  getById(@Param('id', ParseIntPipe) id: number): MissingHistoricalRecordBook {
    return this.service.getById(id);
  }
}
