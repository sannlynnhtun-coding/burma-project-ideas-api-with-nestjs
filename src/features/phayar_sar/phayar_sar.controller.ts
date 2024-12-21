import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DreamDictionaryService } from '../dream_dictionary/dream_dictionary.service';
import { PhayarSarService } from './phayar_sar.service';

@ApiTags('phayar-sar')
@Controller('phayar-sar')
export class PhayarSarController {
  constructor(private readonly phayarSarService: PhayarSarService) { }

  @Get()
  getTitles() {
    let data = this.phayarSarService.getTitles();
    console.log({ data });
    return data;
  }

  @Get(':groupId/:detailId')
  getDetails(
    @Param('groupId', ParseIntPipe) groupId: number,
    @Param('detailId', ParseIntPipe) detailId: number) {
    return this.phayarSarService.getDetails(groupId, detailId);
  }
}