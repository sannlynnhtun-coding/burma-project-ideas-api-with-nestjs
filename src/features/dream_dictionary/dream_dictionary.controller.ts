import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DreamDictionaryService } from './dream_dictionary.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('dream-dictionary')
@Controller('dream-dictionary')
export class DreamDictionaryController {
  constructor(private readonly dreamDictionaryService: DreamDictionaryService) {}

  @Get()
  getBlogHeaders() {
    return this.dreamDictionaryService.getGroupHeaders();
  }

  @Get(':id')
  getBlogDetails(@Param('id', ParseIntPipe) id: number) {
    return this.dreamDictionaryService.getGroupDetails(id);
  }
}
