import { Test, TestingModule } from '@nestjs/testing';
import { BaganMapController } from './bagan_map.controller';
import { BaganMapService } from './bagan_map.service';

describe('BaganMapController', () => {
  let controller: BaganMapController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BaganMapController],
      providers: [{ provide: BaganMapService, useValue: {} }],
    }).compile();

    controller = module.get<BaganMapController>(BaganMapController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
