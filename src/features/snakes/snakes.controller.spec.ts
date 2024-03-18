import { Test, TestingModule } from '@nestjs/testing';
import { SnakesController } from './snakes.controller';

describe('SnakesController', () => {
  let controller: SnakesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnakesController],
    }).compile();

    controller = module.get<SnakesController>(SnakesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
