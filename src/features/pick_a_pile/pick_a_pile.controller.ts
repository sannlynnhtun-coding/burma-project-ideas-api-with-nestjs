import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PickAPileService } from './pick_a_pile.service';
import { PickAPileAnswer } from './pick_a_pile_answer';
import { PickAPileQuestion } from './pick_a_pile_question';

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
  getBird(@Param('id') id): PickAPileAnswer[] {
    return this.pickAPileService
      .getAnswers()
      .filter((x) => x.QuestionId == id);
  }
}
