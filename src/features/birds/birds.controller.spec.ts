import { Test, TestingModule } from '@nestjs/testing';
import { BirdsController } from './birds.controller';
import { BirdsService } from './birds.service';

describe('BirdsController', () => {
  let controller: BirdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BirdsController],
      providers: [{ provide: BirdsService, useValue: {} }],
    }).compile();

    controller = module.get<BirdsController>(BirdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
