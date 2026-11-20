import { Test, TestingModule } from '@nestjs/testing';
import { YbsController } from './ybs.controller';
import { YbsService } from './ybs.service';
import { NotFoundException } from '@nestjs/common';

describe('YbsController', () => {
  let controller: YbsController;
  let service: YbsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [YbsController],
      providers: [YbsService],
    }).compile();

    controller = module.get<YbsController>(YbsController);
    service = module.get<YbsService>(YbsService);
    service.onModuleInit();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
  });

  describe('Bus Lines API', () => {
    it('getAllBuses should return non-reversed bus lines', () => {
      const buses = controller.getAllBuses();
      expect(Array.isArray(buses)).toBe(true);
      expect(buses.length).toBeGreaterThan(0);
      expect(buses[0]).toHaveProperty('id');
      expect(buses[0]).toHaveProperty('num');
      expect(buses[0]).toHaveProperty('isCardAccepted');
      expect(buses[0].isReversed).toBe(false);
    });

    it('getBusesByNumber should return matching bus or throw 404', () => {
      const buses = controller.getAllBuses();
      const firstBusNum = buses[0].num;
      const res = controller.getBusesByNumber(firstBusNum);
      expect(res).toHaveProperty('result');
      expect(Array.isArray(res.result)).toBe(true);
      expect(res.result.length).toBeGreaterThan(0);

      expect(() => controller.getBusesByNumber(999999)).toThrow(
        NotFoundException,
      );
    });

    it('getBusDirection should return bus or throw 404', () => {
      const buses = controller.getAllBuses();
      const firstBusNum = buses[0].num;
      const res = controller.getBusDirection(firstBusNum, 'false', '');
      expect(res).toHaveProperty('bus');
      expect(res.bus.num).toBe(firstBusNum);

      expect(() => controller.getBusDirection(999999, 'false', '')).toThrow(
        NotFoundException,
      );
    });
  });

  describe('Bus Stops API', () => {
    it('getPaginatedBusStops should return page data', () => {
      const res = controller.getPaginatedBusStops(1, 6);
      expect(res).toHaveProperty('totalPages');
      expect(res).toHaveProperty('related_bus');
      expect(res.related_bus.length).toBeLessThanOrEqual(6);
      if (res.related_bus.length > 0) {
        expect(res.related_bus[0]).toHaveProperty('location');
        expect(res.related_bus[0]).toHaveProperty('bus');
      }
    });

    it('searchBusStops should return paged stops', () => {
      const res = controller.searchBusStops('', undefined, 0, 5, 'name');
      expect(res).toHaveProperty('content');
      expect(res).toHaveProperty('totalElements');
      expect(res.content.length).toBeLessThanOrEqual(5);
    });

    it('getNearestBusStops should calculate distance', () => {
      const res = controller.getNearestBusStops(16.8284, 96.1287, false);
      expect(res).toHaveProperty('range_km');
      expect(res).toHaveProperty('near_by_locations');
    });

    it('getBusesForBusStop should return bus list', () => {
      const res = controller.getBusesForBusStop(1623);
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe('PathFinder API', () => {
    it('getPathBetweenStops should return path format', () => {
      const res = controller.getPathBetweenStops(1623, 2948);
      expect(res).toHaveProperty('path');
      expect(Array.isArray(res.path)).toBe(true);
    });

    it('getPathToStore should return path array', () => {
      const res = controller.getPathToStore(1, 1623);
      expect(Array.isArray(res)).toBe(true);
    });
  });

  describe('Stores API', () => {
    it('getAllStores should return stores list', () => {
      const stores = controller.getAllStores();
      expect(Array.isArray(stores)).toBe(true);
      expect(stores.length).toBeGreaterThan(0);
    });

    it('getPaginatedStores should return page response', () => {
      const res = controller.getPaginatedStores(0, 10);
      expect(res).toHaveProperty('content');
      expect(res.content.length).toBeLessThanOrEqual(10);
    });

    it('getStoreById should return store or throw 404', () => {
      const stores = controller.getAllStores();
      const firstId = stores[0].id;
      const res = controller.getStoreById(firstId);
      expect(res.id).toBe(firstId);

      expect(() => controller.getStoreById(999999)).toThrow(NotFoundException);
    });

    it('getNearestStopsForStore should return nearest stops', () => {
      const stores = controller.getAllStores();
      const firstId = stores[0].id;
      const res = controller.getNearestStopsForStore(firstId);
      expect(res).toHaveProperty('store_nearest_locations');
    });
  });

  describe('General & Metadata API', () => {
    it('getAllRegions should return array of strings', () => {
      const regions = controller.getAllRegions();
      expect(Array.isArray(regions)).toBe(true);
    });

    it('getTotalCounts should return bus and stop counts', () => {
      const counts = controller.getTotalCounts();
      expect(counts).toHaveProperty('total_bus');
      expect(counts).toHaveProperty('total_bus_stop');
      expect(counts.total_bus).toBeGreaterThan(0);
      expect(counts.total_bus_stop).toBeGreaterThan(0);
    });
  });
});
