import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { DreamDictionaryService } from './dream_dictionary.service';

@Controller('dream-dictionary')
export class DreamDictionaryController {
  constructor(private readonly dreamDictionaryService: DreamDictionaryService) {}

  @Get()
  getBlogHeaders() {
    return this.dreamDictionaryService.getBlogHeaders();
  }

  @Get(':id')
  getBlogDetails(@Param('id', ParseIntPipe) id: number) {
    return this.dreamDictionaryService.getBlogDetails(id);
  }
}
