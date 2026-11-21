import { Injectable, OnModuleInit } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import {
  BusDTO,
  BusStopDTO,
  BusStopScrollDTO,
  PageResponse,
  PathDTO,
  ResponseForBusStop,
  StoreDTO,
} from './ybs.dto';

interface RawBus {
  id: string;
  created_at: string;
  delete_flag: string;
  is_card_accepted: string;
  is_reversed: string;
  bus_number: string;
  updated_at: string;
  variant_id: string;
  end_stop_id: string;
  start_stop_id: string;
}

interface RawBusStop {
  id: string;
  created_at: string;
  delete_flag: string;
  lat: string;
  lon: string;
  stop_name: string;
  updated_at: string;
  region_id: string;
}

interface RawBusRoute {
  bus_id: string;
  bus_stop_id: string;
  stop_order: string;
}

interface RawNearestBusStop {
  id: string;
  created_at: string;
  distance_km: string;
  updated_at: string;
  bus_stop_id: string;
  store_id: string;
}

interface RawRegion {
  id: string;
  created_at: string;
  delete_flag: string;
  region_name: string;
  updated_at: string;
}

interface RawStore {
  id: string;
  eng_name: string;
  mm_name: string;
  category: string;
  created_at: string;
  delete_flag: string;
  lat: string;
  lon: string;
  updated_at: string;
  region_id: string;
}

@Injectable()
export class YbsService implements OnModuleInit {
  private regionsMap = new Map<number, string>();
  private busStopsMap = new Map<number, BusStopDTO>();
  private allBusStops: BusStopDTO[] = [];
  private busesMap = new Map<number, RawBus>();
  private allBuses: RawBus[] = [];

  // bus_id -> ordered array of stop IDs
  private busStopsSequence = new Map<number, number[]>();

  // bus_stop_id -> array of bus IDs
  private stopToBusesMap = new Map<number, number[]>();

  // store_id -> array of { bus_stop_id, distance_km }
  private storeNearestStopsMap = new Map<
    number,
    Array<{ stopId: number; distance: number }>
  >();

  private storesMap = new Map<number, StoreDTO>();
  private allStores: StoreDTO[] = [];

  onModuleInit() {
    this.loadData();
  }

  private loadData() {
    const basePath = path.join(process.cwd(), 'public', 'ybs');

    // 1. Load regions
    const rawRegions: RawRegion[] = JSON.parse(
      fs.readFileSync(path.join(basePath, 'regions.json'), 'utf8'),
    );
    for (const r of rawRegions) {
      this.regionsMap.set(Number(r.id), r.region_name || '');
    }

    // 2. Load bus stops
    const rawBusStops: RawBusStop[] = JSON.parse(
      fs.readFileSync(path.join(basePath, 'bus_stops.json'), 'utf8'),
    );
    for (const s of rawBusStops) {
      if (s.delete_flag === 'true') continue;
      const stopDto: BusStopDTO = {
        id: Number(s.id),
        name: s.stop_name || '',
        longitude: Number(s.lon) || 0,
        latitude: Number(s.lat) || 0,
        regionName: this.regionsMap.get(Number(s.region_id)) || '',
      };
      this.busStopsMap.set(stopDto.id, stopDto);
      this.allBusStops.push(stopDto);
    }

    // 3. Load buses
    const rawBuses: RawBus[] = JSON.parse(
      fs.readFileSync(path.join(basePath, 'buses.json'), 'utf8'),
    );
    for (const b of rawBuses) {
      if (b.delete_flag === 'true') continue;
      this.busesMap.set(Number(b.id), b);
      this.allBuses.push(b);
    }

    // 4. Load bus routes (bus_routes.json is pre-sorted by bus_id and stop_order)
    const rawBusRoutes: RawBusRoute[] = JSON.parse(
      fs.readFileSync(path.join(basePath, 'bus_routes.json'), 'utf8'),
    );
    for (const r of rawBusRoutes) {
      const busId = Number(r.bus_id);
      const stopId = Number(r.bus_stop_id);

      let seq = this.busStopsSequence.get(busId);
      if (!seq) {
        seq = [];
        this.busStopsSequence.set(busId, seq);
      }
      seq.push(stopId);

      let stopBuses = this.stopToBusesMap.get(stopId);
      if (!stopBuses) {
        stopBuses = [];
        this.stopToBusesMap.set(stopId, stopBuses);
      }
      if (!stopBuses.includes(busId)) {
        stopBuses.push(busId);
      }
    }

    // 5. Load nearest stops
    const rawNearest: RawNearestBusStop[] = JSON.parse(
      fs.readFileSync(path.join(basePath, 'nearest_bus_stops.json'), 'utf8'),
    );
    for (const n of rawNearest) {
      const storeId = Number(n.store_id);
      const stopId = Number(n.bus_stop_id);
      const distance = Number(n.distance_km) || 0;
      let nearest = this.storeNearestStopsMap.get(storeId);
      if (!nearest) {
        nearest = [];
        this.storeNearestStopsMap.set(storeId, nearest);
      }
      nearest.push({ stopId, distance });
    }

    // 6. Load stores
    const rawStores: RawStore[] = JSON.parse(
      fs.readFileSync(path.join(basePath, 'stores.json'), 'utf8'),
    );
    for (const st of rawStores) {
      if (st.delete_flag === 'true') continue;
      const nearest = this.storeNearestStopsMap.get(Number(st.id)) || [];
      const storeDto: StoreDTO = {
        id: Number(st.id),
        mmName: st.mm_name || '',
        engName: st.eng_name || '',
        category: st.category || '',
        regionName: this.regionsMap.get(Number(st.region_id)) || '',
        latitude: Number(st.lat) || 0,
        longitude: Number(st.lon) || 0,
        totalNearestStops: nearest.length,
      };
      this.storesMap.set(storeDto.id, storeDto);
      this.allStores.push(storeDto);
    }
  }

  // Helper to map RawBus to BusDTO
  private mapToBusDTO(
    rawBus: RawBus,
    includeDestinations: boolean = false,
  ): BusDTO {
    const startStop = rawBus.start_stop_id
      ? this.busStopsMap.get(Number(rawBus.start_stop_id)) || null
      : null;
    const endStop = rawBus.end_stop_id
      ? this.busStopsMap.get(Number(rawBus.end_stop_id)) || null
      : null;

    const stopIds = this.busStopsSequence.get(Number(rawBus.id)) || [];
    let destinations: BusStopDTO[] = [];
    if (includeDestinations) {
      destinations = stopIds
        .map((sId) => this.busStopsMap.get(sId))
        .filter((s): s is BusStopDTO => s !== undefined);
    }

    return {
      id: Number(rawBus.id),
      num: Number(rawBus.bus_number),
      isReversed: rawBus.is_reversed === 'true',
      variantId: rawBus.variant_id || '',
      isCardAccepted: rawBus.is_card_accepted === 'true',
      totalStops: stopIds.length,
      startStop,
      endStop,
      destinations,
    };
  }

  // --- Bus Lines API ---

  getAllBuses(): BusDTO[] {
    return this.allBuses
      .filter((b) => b.is_reversed === 'false')
      .map((b) => this.mapToBusDTO(b, false));
  }

  getBusesByNumber(num: number): { result: BusDTO[] } | null {
    const matching = this.allBuses.filter((b) => Number(b.bus_number) === num);
    if (!matching.length) {
      return null;
    }
    const result = matching.map((b) => {
      const dto = this.mapToBusDTO(b, false);
      dto.destinations = dto.startStop ? [dto.startStop] : [];
      return dto;
    });
    return { result };
  }

  getBusDirection(
    busNum: number,
    isReversed: boolean = false,
    variantId: string = '',
  ): { bus: BusDTO } | null {
    const rawBus = this.allBuses.find(
      (b) =>
        Number(b.bus_number) === busNum &&
        (b.is_reversed === 'true') === isReversed &&
        (b.variant_id || '') === variantId,
    );
    if (!rawBus) {
      return null;
    }
    return { bus: this.mapToBusDTO(rawBus, true) };
  }

  // --- Bus Stops API ---

  getPaginatedBusStops(page: number = 1, pageSize: number = 6): BusStopScrollDTO {
    const p = Math.max(1, page);
    const size = Math.max(1, pageSize);
    const totalPages = Math.ceil(this.allBusStops.length / size);
    const startIndex = (p - 1) * size;
    const pagedStops = this.allBusStops.slice(startIndex, startIndex + size);

    const related_bus: ResponseForBusStop[] = pagedStops.map((stop) => {
      const busIds = this.stopToBusesMap.get(stop.id) || [];
      const buses: BusDTO[] = busIds
        .map((bId) => this.busesMap.get(bId))
        .filter((b): b is RawBus => b !== undefined)
        .map((b) => {
          const dto = this.mapToBusDTO(b, false);
          delete dto.startStop;
          delete dto.endStop;
          delete dto.destinations;
          return dto;
        });

      return {
        totalBuses: buses.length,
        location: stop,
        bus: buses,
      };
    });

    return {
      totalPages,
      related_bus,
    };
  }

  searchBusStops(
    name: string = '',
    regionName?: string,
    page: number = 0,
    size: number = 5,
    sort: string = 'name',
  ): PageResponse<BusStopDTO> {
    const queryName = name.trim().toLowerCase();
    const queryRegion = regionName ? regionName.trim().toLowerCase() : '';

    let filtered = this.allBusStops.filter((s) => {
      const matchesName = !queryName || s.name.toLowerCase().includes(queryName);
      const matchesRegion =
        !queryRegion || s.regionName.toLowerCase().includes(queryRegion);
      return matchesName && matchesRegion;
    });

    if (sort === 'name') {
      filtered.sort((a, b) => a.name.localeCompare(b.name));
    }

    const p = Math.max(0, page);
    const s = Math.max(1, size);
    const totalElements = filtered.length;
    const totalPages = Math.ceil(totalElements / s);
    const content = filtered.slice(p * s, (p + 1) * s);

    return {
      content,
      pageable: {
        pageNumber: p,
        pageSize: s,
        sort: { empty: !sort, sorted: !!sort, unsorted: !sort },
        offset: p * s,
        paged: true,
        unpaged: false,
      },
      totalPages,
      totalElements,
      last: p >= totalPages - 1,
      size: s,
      number: p,
      first: p === 0,
      numberOfElements: content.length,
      empty: content.length === 0,
    };
  }

  // Haversine distance in km
  private calculateDistanceKm(
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number {
    const R = 6371;
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  getNearestBusStops(
    userLat: number,
    userLon: number,
    findStop: boolean,
  ): { range_km: number; near_by_locations: ResponseForBusStop[] } {
    const rangeKm = 1.0;
    const nearby: Array<{ stop: BusStopDTO; dist: number }> = [];

    for (const stop of this.allBusStops) {
      const dist = this.calculateDistanceKm(
        userLat,
        userLon,
        stop.latitude,
        stop.longitude,
      );
      if (dist <= rangeKm) {
        nearby.push({ stop, dist });
      }
    }

    nearby.sort((a, b) => a.dist - b.dist);

    const targetList = findStop && nearby.length > 0 ? [nearby[0]] : nearby;

    const near_by_locations: ResponseForBusStop[] = targetList.map((item) => {
      const busIds = this.stopToBusesMap.get(item.stop.id) || [];
      return {
        totalBuses: busIds.length,
        location: item.stop,
        bus: [],
      };
    });

    return {
      range_km: rangeKm,
      near_by_locations,
    };
  }

  getBusesForBusStop(stopId: number): BusDTO[] {
    const busIds = this.stopToBusesMap.get(stopId) || [];
    return busIds
      .map((bId) => this.busesMap.get(bId))
      .filter((b): b is RawBus => b !== undefined)
      .map((b) => this.mapToBusDTO(b, false));
  }

  // --- PathFinder API ---

  getPathBetweenStops(startId: number, endId: number): { path: PathDTO[] } {
    if (startId === endId) {
      return { path: [] };
    }

    const startBuses = this.stopToBusesMap.get(startId) || [];
    const paths: PathDTO[] = [];

    // 1. Direct routes (0 transfers / 1 bus)
    for (const busId of startBuses) {
      const rawBus = this.busesMap.get(busId);
      if (!rawBus) continue;

      const stopSeq = this.busStopsSequence.get(busId) || [];
      const sIdx = stopSeq.indexOf(startId);
      const eIdx = stopSeq.indexOf(endId, sIdx + 1);

      if (sIdx !== -1 && eIdx !== -1 && sIdx < eIdx) {
        const routeStops = stopSeq
          .slice(sIdx, eIdx + 1)
          .map((id) => this.busStopsMap.get(id))
          .filter((s): s is BusStopDTO => s !== undefined);

        const busDto: BusDTO = {
          id: Number(rawBus.id),
          num: Number(rawBus.bus_number),
          isReversed: rawBus.is_reversed === 'true',
          variantId: rawBus.variant_id || '',
          isCardAccepted: rawBus.is_card_accepted === 'true',
          totalStops: routeStops.length,
          destinations: routeStops,
        };

        paths.push({
          totalBuses: 1,
          totalBusStops: routeStops.length,
          busSequence: [busDto],
        });
      }
    }

    if (paths.length > 0) {
      return { path: paths };
    }

    // 2. 1-transfer routes (2 buses)
    for (const b1 of startBuses) {
      const rawB1 = this.busesMap.get(b1);
      if (!rawB1) continue;
      const sSeq1 = this.busStopsSequence.get(b1) || [];
      const sIdx = sSeq1.indexOf(startId);
      if (sIdx === -1) continue;

      const reachableStops = new Set(sSeq1.slice(sIdx + 1));

      for (const transferStopId of reachableStops) {
        const b2List = this.stopToBusesMap.get(transferStopId) || [];
        for (const b2 of b2List) {
          if (b2 === b1) continue;
          const rawB2 = this.busesMap.get(b2);
          if (!rawB2) continue;

          const sSeq2 = this.busStopsSequence.get(b2) || [];
          const tIdx = sSeq2.indexOf(transferStopId);
          const eIdx = sSeq2.indexOf(endId, tIdx + 1);

          if (tIdx !== -1 && eIdx !== -1 && tIdx < eIdx) {
            const leg1Stops = sSeq1
              .slice(sIdx, sSeq1.indexOf(transferStopId, sIdx + 1) + 1)
              .map((id) => this.busStopsMap.get(id))
              .filter((s): s is BusStopDTO => s !== undefined);

            const leg2Stops = sSeq2
              .slice(tIdx, eIdx + 1)
              .map((id) => this.busStopsMap.get(id))
              .filter((s): s is BusStopDTO => s !== undefined);

            const bus1Dto: BusDTO = {
              id: Number(rawB1.id),
              num: Number(rawB1.bus_number),
              isReversed: rawB1.is_reversed === 'true',
              variantId: rawB1.variant_id || '',
              isCardAccepted: rawB1.is_card_accepted === 'true',
              totalStops: leg1Stops.length,
              destinations: leg1Stops,
            };

            const bus2Dto: BusDTO = {
              id: Number(rawB2.id),
              num: Number(rawB2.bus_number),
              isReversed: rawB2.is_reversed === 'true',
              variantId: rawB2.variant_id || '',
              isCardAccepted: rawB2.is_card_accepted === 'true',
              totalStops: leg2Stops.length,
              destinations: leg2Stops,
            };

            paths.push({
              totalBuses: 2,
              totalBusStops: leg1Stops.length + leg2Stops.length - 1,
              busSequence: [bus1Dto, bus2Dto],
            });

            if (paths.length >= 5) {
              return { path: paths };
            }
          }
        }
      }
    }

    return { path: paths };
  }

  getPathToStore(storeId: number, startBusStopId: number): PathDTO[] {
    const nearestStops = this.storeNearestStopsMap.get(storeId) || [];
    const allPaths: PathDTO[] = [];

    for (const ns of nearestStops) {
      const res = this.getPathBetweenStops(startBusStopId, ns.stopId);
      if (res.path.length > 0) {
        allPaths.push(...res.path);
      }
    }

    return allPaths;
  }

  // --- Stores API ---

  getAllStores(): StoreDTO[] {
    return this.allStores;
  }

  getPaginatedStores(page: number = 0, size: number = 10): PageResponse<StoreDTO> {
    const p = Math.max(0, page);
    const s = Math.max(1, size);
    const totalElements = this.allStores.length;
    const totalPages = Math.ceil(totalElements / s);
    const content = this.allStores.slice(p * s, (p + 1) * s);

    return {
      content,
      pageable: {
        pageNumber: p,
        pageSize: s,
        sort: { empty: true, sorted: false, unsorted: true },
        offset: p * s,
        paged: true,
        unpaged: false,
      },
      totalPages,
      totalElements,
      last: p >= totalPages - 1,
      size: s,
      number: p,
      first: p === 0,
      numberOfElements: content.length,
      empty: content.length === 0,
    };
  }

  getStoreById(id: number): StoreDTO | null {
    return this.storesMap.get(id) || null;
  }

  searchStores(
    name?: string,
    regionName?: string,
    page: number = 0,
    size: number = 10,
  ): PageResponse<StoreDTO> {
    const qName = name ? name.trim().toLowerCase() : '';
    const qRegion = regionName ? regionName.trim().toLowerCase() : '';

    const filtered = this.allStores.filter((st) => {
      const matchesName =
        !qName ||
        st.engName.toLowerCase().includes(qName) ||
        st.mmName.toLowerCase().includes(qName);
      const matchesRegion =
        !qRegion || st.regionName.toLowerCase().includes(qRegion);
      return matchesName && matchesRegion;
    });

    const p = Math.max(0, page);
    const s = Math.max(1, size);
    const totalElements = filtered.length;
    const totalPages = Math.ceil(totalElements / s);
    const content = filtered.slice(p * s, (p + 1) * s);

    return {
      content,
      pageable: {
        pageNumber: p,
        pageSize: s,
        sort: { empty: true, sorted: false, unsorted: true },
        offset: p * s,
        paged: true,
        unpaged: false,
      },
      totalPages,
      totalElements,
      last: p >= totalPages - 1,
      size: s,
      number: p,
      first: p === 0,
      numberOfElements: content.length,
      empty: content.length === 0,
    };
  }

  getNearestStopsForStore(
    storeId: number,
  ): { store_nearest_locations: ResponseForBusStop[] } {
    const nearest = this.storeNearestStopsMap.get(storeId) || [];
    const store_nearest_locations: ResponseForBusStop[] = nearest.map((ns) => {
      const stop = this.busStopsMap.get(ns.stopId);
      const busIds = this.stopToBusesMap.get(ns.stopId) || [];
      return {
        totalBuses: busIds.length,
        location:
          stop || {
            id: ns.stopId,
            name: '',
            latitude: 0,
            longitude: 0,
            regionName: '',
          },
        bus: [],
      };
    });

    return { store_nearest_locations };
  }

  // --- General & Metadata API ---

  getAllRegions(): string[] {
    const regionNames = Array.from(this.regionsMap.values()).filter((name) =>
      Boolean(name && name.trim()),
    );
    return Array.from(new Set(regionNames)).sort();
  }

  getTotalCounts(): { total_bus: number; total_bus_stop: number } {
    return {
      total_bus: this.allBuses.length,
      total_bus_stop: this.allBusStops.length,
    };
  }
}
