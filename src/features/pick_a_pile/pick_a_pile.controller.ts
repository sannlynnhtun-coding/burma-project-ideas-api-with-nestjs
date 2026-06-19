import { Controller, Get, Param, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { PickAPileService } from './pick_a_pile.service';
import { PickAPileAnswer } from './pick_a_pile_answer';
import { PickAPileQuestion } from './pick_a_pile_question';
import { buildAssetUrl } from '../../common/asset-url';

@ApiTags('pick-a-pile')
@Controller('pick-a-pile')
export class PickAPileController {
  constructor(private readonly pickAPileService: PickAPileService) {}

  @Get()
  getBirds(): PickAPileQuestion[] {
    return this.pickAPileService.getQuestions();
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  getBird(@Req() request: Request, @Param('id') id): PickAPileAnswer[] {
    return this.pickAPileService
      .getAnswers()
      .filter((x) => x.QuestionId == id)
      .map((answer) => ({
        ...answer,
        AnswerImageUrl: buildAssetUrl(request, answer.AnswerImageUrl),
      }));
  }
}
