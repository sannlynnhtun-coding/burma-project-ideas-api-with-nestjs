import { Test, TestingModule } from '@nestjs/testing';
import { BirdsController } from './birds.controller';

describe('BirdsController', () => {
  let controller: BirdsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BirdsController],
    }).compile();

    controller = module.get<BirdsController>(BirdsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
