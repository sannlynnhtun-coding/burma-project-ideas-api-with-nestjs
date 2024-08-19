import { Test, TestingModule } from '@nestjs/testing';
import { PhayarSarController } from './phayar_sar.controller';

describe('PhayarSarController', () => {
  let controller: PhayarSarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PhayarSarController],
    }).compile();

    controller = module.get<PhayarSarController>(PhayarSarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
