import {
  Controller,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { YbsService } from './ybs.service';
import {
  BusDTO,
  BusStopDTO,
  BusStopScrollDTO,
  PageResponse,
  PathDTO,
  ResponseForBusStop,
  StoreDTO,
} from './ybs.dto';

@ApiTags('ybs | ရန်ကုန်ဘတ်စ်ကားလိုင်းများ')
@Controller('ybs')
export class YbsController {
  constructor(private readonly ybsService: YbsService) {}

  // ==========================================
  // 2.1 Bus Lines API (/api/buses)
  // ==========================================

  @Get('buses')
  @ApiOperation({ summary: 'Get all available bus lines' })
  getAllBuses(): BusDTO[] {
    return this.ybsService.getAllBuses();
  }

  @Get('buses/:num/direction')
  @ApiOperation({ summary: 'Get specific bus direction and variant' })
  @ApiParam({ name: 'num', type: Number })
  @ApiQuery({ name: 'isReversed', required: false, type: Boolean })
  @ApiQuery({ name: 'variantId', required: false, type: String })
  getBusDirection(
    @Param('num', ParseIntPipe) num: number,
    @Query('isReversed') isReversed?: string,
    @Query('variantId') variantId?: string,
  ): { bus: BusDTO } {
    const reversed = isReversed === 'true';
    const variant = variantId || '';

    const result = this.ybsService.getBusDirection(num, reversed, variant);
    if (!result) {
      throw new NotFoundException({
        message: `YBS-${num} is not available`,
      });
    }
    return result;
  }

  @Get('buses/:num')
  @ApiOperation({ summary: 'Search bus lines by number' })
  @ApiParam({ name: 'num', type: Number })
  getBusesByNumber(@Param('num', ParseIntPipe) num: number): {
    result: BusDTO[];
  } {
    const result = this.ybsService.getBusesByNumber(num);
    if (!result) {
      throw new NotFoundException({
        message: `YBS-${num} is not available`,
      });
    }
    return result;
  }

  // ==========================================
  // 2.2 Bus Stops API (/api/bus-stops)
  // ==========================================

  @Get('bus-stops')
  @ApiOperation({ summary: 'Paginated bus stops browser' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'page_size', required: false, type: Number })
  getPaginatedBusStops(
    @Query('page') page?: number,
    @Query('page_size') pageSize?: number,
  ): BusStopScrollDTO {
    return this.ybsService.getPaginatedBusStops(
      page ? Number(page) : 1,
      pageSize ? Number(pageSize) : 6,
    );
  }

  @Get('bus-stops/search')
  @ApiOperation({ summary: 'Search bus stops' })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'regionName', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'size', required: false, type: Number })
  @ApiQuery({ name: 'sort', required: false, type: String })
  searchBusStops(
    @Query('name') name?: string,
    @Query('regionName') regionName?: string,
    @Query('page') page?: number,
    @Query('size') size?: number,
    @Query('sort') sort?: string,
  ): PageResponse<BusStopDTO> {
    return this.ybsService.searchBusStops(
      name || '',
      regionName,
      page ? Number(page) : 0,
      size ? Number(size) : 5,
      sort || 'name',
    );
  }

  @Get('bus-stops/nearest')
  @ApiOperation({ summary: 'Get nearest bus stops by GPS' })
  @ApiQuery({ name: 'user_lat', required: true, type: Number })
  @ApiQuery({ name: 'user_lon', required: true, type: Number })
  @ApiQuery({ name: 'findStop', required: true, type: Boolean })
  getNearestBusStops(
    @Query('user_lat') userLat: number,
    @Query('user_lon') userLon: number,
    @Query('findStop') findStop: string | boolean,
  ): { range_km: number; near_by_locations: ResponseForBusStop[] } {
    const isFindStop = String(findStop) === 'true';
    return this.ybsService.getNearestBusStops(
      Number(userLat),
      Number(userLon),
      isFindStop,
    );
  }

  @Get('bus-stops/:id/buses')
  @ApiOperation({ summary: 'Get buses serving a specific bus stop' })
  @ApiParam({ name: 'id', type: Number })
  getBusesForBusStop(@Param('id', ParseIntPipe) id: number): BusDTO[] {
    return this.ybsService.getBusesForBusStop(id);
  }

  // ==========================================
  // 2.3 PathFinder & Route Planning API (/api/path-finder)
  // ==========================================

  @Get('path-finder/stop-lvl-path')
  @ApiOperation({ summary: 'Stop-to-stop route path finder' })
  @ApiQuery({ name: 'start_id', required: true, type: Number })
  @ApiQuery({ name: 'end_id', required: true, type: Number })
  getPathBetweenStops(
    @Query('start_id') startId: number,
    @Query('end_id') endId: number,
  ): { path: PathDTO[] } {
    return this.ybsService.getPathBetweenStops(
      Number(startId),
      Number(endId),
    );
  }

  @Get('path-finder/store-lvl-path')
  @ApiOperation({ summary: 'Store-to-stop route path finder' })
  @ApiQuery({ name: 'storeId', required: true, type: Number })
  @ApiQuery({ name: 'startBusStopId', required: true, type: Number })
  getPathToStore(
    @Query('storeId') storeId: number,
    @Query('startBusStopId') startBusStopId: number,
  ): PathDTO[] {
    return this.ybsService.getPathToStore(
      Number(storeId),
      Number(startBusStopId),
    );
  }

  // ==========================================
  // 2.4 Stores & Venues API (/api/stores)
  // ==========================================

  @Get('stores/all')
  @ApiOperation({ summary: 'Browse all stores' })
  getAllStores(): StoreDTO[] {
    return this.ybsService.getAllStores();
  }

  @Get('stores/search')
  @ApiOperation({ summary: 'Search stores' })
  @ApiQuery({ name: 'name', required: false, type: String })
  @ApiQuery({ name: 'regionName', required: false, type: String })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'size', required: false, type: Number })
  searchStores(
    @Query('name') name?: string,
    @Query('regionName') regionName?: string,
    @Query('page') page?: number,
    @Query('size') size?: number,
  ): PageResponse<StoreDTO> {
    return this.ybsService.searchStores(
      name,
      regionName,
      page ? Number(page) : 0,
      size ? Number(size) : 10,
    );
  }

  @Get('stores/:id/nearest-stops')
  @ApiOperation({ summary: 'Get nearest bus stops for store' })
  @ApiParam({ name: 'id', type: Number })
  getNearestStopsForStore(
    @Param('id', ParseIntPipe) id: number,
  ): { store_nearest_locations: ResponseForBusStop[] } {
    return this.ybsService.getNearestStopsForStore(id);
  }

  @Get('stores/:id')
  @ApiOperation({ summary: 'Get store details by ID' })
  @ApiParam({ name: 'id', type: Number })
  getStoreById(@Param('id', ParseIntPipe) id: number): StoreDTO {
    const store = this.ybsService.getStoreById(id);
    if (!store) {
      throw new NotFoundException({
        message: `Store-${id} is not available`,
      });
    }
    return store;
  }

  @Get('stores')
  @ApiOperation({ summary: 'Paginated stores browser' })
  @ApiQuery({ name: 'page', required: false, type: Number })
  @ApiQuery({ name: 'size', required: false, type: Number })
  getPaginatedStores(
    @Query('page') page?: number,
    @Query('size') size?: number,
  ): PageResponse<StoreDTO> {
    return this.ybsService.getPaginatedStores(
      page ? Number(page) : 0,
      size ? Number(size) : 10,
    );
  }

  // ==========================================
  // 2.5 General & Metadata API (/api)
  // ==========================================

  @Get('regions')
  @ApiOperation({ summary: 'Get all townships / regions' })
  getAllRegions(): string[] {
    return this.ybsService.getAllRegions();
  }

  @Get('total-counts')
  @ApiOperation({ summary: 'Get system total counts' })
  getTotalCounts(): { total_bus: number; total_bus_stop: number } {
    return this.ybsService.getTotalCounts();
  }
}
