import { Controller, Get, Param, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { QuotletService } from './quotlets.service';
import { Quotlet } from './quotlets';
import { buildFeatureAssetUrl } from '../../common/asset-url';

@ApiTags('quotlets')
@Controller('quotlets')
export class QuotletController {
  constructor(private readonly service: QuotletService) {}

  @Get()
  getAll(@Req() request: Request): Quotlet[] {
    return this.service.getAll().map((quotlet) => ({
      ...quotlet,
      ImageUrl: buildFeatureAssetUrl(request, 'quotlets', quotlet.ImageUrl),
    }));
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  getById(@Req() request: Request, @Param('id') id): Quotlet {
    const quotlet = this.service.getAll().filter((x) => x.Id == id)[0];

    if (!quotlet) return quotlet;

    return {
      ...quotlet,
      ImageUrl: buildFeatureAssetUrl(request, 'quotlets', quotlet.ImageUrl),
    };
  }
}
