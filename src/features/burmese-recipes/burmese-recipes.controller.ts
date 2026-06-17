import { Controller, Get, Param } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { BurmeseRecipeService } from './burmese-recipes.service';
import { BurmeseRecipe } from './burmese-recipes';

@ApiTags('burmese-recipes')
@Controller('burmese-recipes')
export class BurmeseRecipeController {
  constructor(private readonly service: BurmeseRecipeService) {}

  @Get()
  getAll(): BurmeseRecipe[] { return this.service.getAll(); }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  getById(@Param('id') id): BurmeseRecipe {
    return this.service.getAll().filter(x => x.Guid == id)[0];
  }
}
