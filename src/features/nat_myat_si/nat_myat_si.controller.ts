import { Controller, Get, Param, ParseIntPipe, Query } from '@nestjs/common';
import {
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import {
  NatMyatSiQuestion,
  NatMyatSiReading,
  NatMyatSiSymbol,
} from './nat_myat_si';
import { NatMyatSiService } from './nat_myat_si.service';

@ApiTags('nat-myat-si | နတ်မျက်စိ')
@Controller('nat-myat-si')
export class NatMyatSiController {
  constructor(private readonly natMyatSiService: NatMyatSiService) {}

  @Get('questions')
  @ApiOperation({ summary: 'List or search NatMyatSi questions' })
  @ApiQuery({
    name: 'search',
    required: false,
    description: 'Text to find within the Myanmar question text',
  })
  @ApiOkResponse({ type: NatMyatSiQuestion, isArray: true })
  getQuestions(@Query('search') search?: string): NatMyatSiQuestion[] {
    return this.natMyatSiService.getQuestions(search);
  }

  @Get('questions/:questionId')
  @ApiOperation({ summary: 'Get one NatMyatSi question' })
  @ApiParam({ name: 'questionId', type: Number, example: 1 })
  @ApiOkResponse({ type: NatMyatSiQuestion })
  @ApiNotFoundResponse({ description: 'Question not found' })
  getQuestion(
    @Param('questionId', ParseIntPipe) questionId: number,
  ): NatMyatSiQuestion {
    return this.natMyatSiService.getQuestion(questionId);
  }

  @Get('symbols')
  @ApiOperation({ summary: 'List the 16 NatMyatSi symbols' })
  @ApiOkResponse({ type: NatMyatSiSymbol, isArray: true })
  getSymbols(): NatMyatSiSymbol[] {
    return this.natMyatSiService.getSymbols();
  }

  @Get('readings/:questionId/:symbolId')
  @ApiOperation({ summary: 'Get the answer for a question and symbol' })
  @ApiParam({ name: 'questionId', type: Number, example: 1 })
  @ApiParam({ name: 'symbolId', type: String, example: 'pisces' })
  @ApiOkResponse({ type: NatMyatSiReading })
  @ApiNotFoundResponse({
    description: 'Question, symbol, or reading not found',
  })
  getReading(
    @Param('questionId', ParseIntPipe) questionId: number,
    @Param('symbolId') symbolId: string,
  ): NatMyatSiReading {
    return this.natMyatSiService.getReading(questionId, symbolId);
  }
}
