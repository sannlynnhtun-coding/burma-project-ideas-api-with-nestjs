import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { LatHtaukBayDinService } from './lat_htauk_bay_din.service';
import { LatHtaukBayDinQuestion } from './lat_htauk_bay_din_question';
import { LatHtaukBayDinAnswer } from './lat_htauk_bay_din_answer';

@ApiTags('lat-htauk-bay-din')
@Controller('lat-htauk-bay-din')
export class LatHtaukBayDinController {
  constructor(private readonly latHtaukBayDinService: LatHtaukBayDinService) {}

  @Get('Question')
  getQuestions(): LatHtaukBayDinQuestion[] {
    return this.latHtaukBayDinService.getQuestions();
  }

  @Get('NumberList')
  getNumberList(): string[] {
    return this.latHtaukBayDinService.getNumberList();
  }

  @Get('Answer/:questionNo/:answerNo')
  getAnswer(
    @Param('questionNo') questionNo: number,
    @Param('answerNo') answerNo: number,
  ): LatHtaukBayDinAnswer {
    return this.latHtaukBayDinService.getAnswer(questionNo, answerNo);
  }
}
