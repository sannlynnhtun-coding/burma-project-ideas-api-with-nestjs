import { Test, TestingModule } from '@nestjs/testing';
import { SnakesController } from './snakes.controller';
import { SnakeService } from './snakes.service';

describe('SnakesController', () => {
  let controller: SnakesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SnakesController],
      providers: [{ provide: SnakeService, useValue: {} }],
    }).compile();

    controller = module.get<SnakesController>(SnakesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
