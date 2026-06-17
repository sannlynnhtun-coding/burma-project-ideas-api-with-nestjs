import { Test, TestingModule } from '@nestjs/testing';
import { PickAPileController } from './pick_a_pile.controller';
import { PickAPileService } from './pick_a_pile.service';

describe('PickAPileController', () => {
  let controller: PickAPileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PickAPileController],
      providers: [{ provide: PickAPileService, useValue: {} }],
    }).compile();

    controller = module.get<PickAPileController>(PickAPileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
