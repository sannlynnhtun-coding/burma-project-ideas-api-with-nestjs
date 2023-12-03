import { Controller, Get, Param } from '@nestjs/common';
import { BaganMapService } from './bagan_map.service';
import { TravelRoute } from './travel_route';
import { BaganMapInfoDetail } from './bagan_map_info_detail';
import { ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('bagan-map')
@Controller('bagan-map')
export class BaganMapController {
  constructor(private readonly baganMapService: BaganMapService) {}

  @Get()
  getRouteId(): object {
    return this.baganMapService
      .getTravelRoute()
      .map((x) => ({ Id: x.TravelRouteId, RouteName: x.TravelRouteName }));
  }

  @Get('/:id')
  @ApiParam({ name: 'id' })
  getTravleRoute(@Param('id') id): TravelRoute {
    return this.baganMapService
      .getTravelRoute()
      .filter((x) => x.TravelRouteId == id)[0];
  }

  @Get('/detail/:id')
  @ApiParam({ name: 'id' })
  getMapInfoDetail(@Param('id') id): BaganMapInfoDetail {
    return this.baganMapService
      .getBaganMapDeatil()
      .filter((x) => x.Id == id)[0];
  }
}
