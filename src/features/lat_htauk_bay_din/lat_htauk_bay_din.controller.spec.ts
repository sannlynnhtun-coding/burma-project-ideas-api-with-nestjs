import { Test, TestingModule } from '@nestjs/testing';
import { LatHtaukBayDinController } from './lat_htauk_bay_din.controller';
import { LatHtaukBayDinService } from './lat_htauk_bay_din.service';

describe('LatHtaukBayDinController', () => {
  let controller: LatHtaukBayDinController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LatHtaukBayDinController],
      providers: [{ provide: LatHtaukBayDinService, useValue: {} }],
    }).compile();

    controller = module.get<LatHtaukBayDinController>(LatHtaukBayDinController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
