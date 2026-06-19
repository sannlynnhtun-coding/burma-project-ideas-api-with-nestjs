import { Controller, Get, Param, Req } from '@nestjs/common';
import type { Request } from 'express';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { ZodiacSignService } from './zodiac.service';
import { ZodiacSign } from './zodiac';
import { buildFeatureAssetUrl } from '../../common/asset-url';

@ApiTags('zodiac')
@Controller('zodiac')
export class ZodiacSignController {
  constructor(private readonly service: ZodiacSignService) {}

  @Get()
  getAll(@Req() request: Request): ZodiacSign[] {
    return this.service.getAll().map((zodiacSign) =>
      this.withAssetUrls(request, zodiacSign),
    );
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  getById(@Req() request: Request, @Param('id') id): ZodiacSign {
    const zodiacSign = this.service.getAll().filter((x) => x.Id == id)[0];

    if (!zodiacSign) return zodiacSign;

    return this.withAssetUrls(request, zodiacSign);
  }

  private withAssetUrls(
    request: Request,
    zodiacSign: ZodiacSign,
  ): ZodiacSign {
    return {
      ...zodiacSign,
      ZodiacSignImageUrl: buildFeatureAssetUrl(
        request,
        'zodiac',
        zodiacSign.ZodiacSignImageUrl,
      ),
      ZodiacSign2ImageUrl: buildFeatureAssetUrl(
        request,
        'zodiac',
        zodiacSign.ZodiacSign2ImageUrl,
      ),
      ElementImageUrl: buildFeatureAssetUrl(
        request,
        'zodiac',
        zodiacSign.ElementImageUrl,
      ),
    };
  }
}
