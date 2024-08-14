import { Test, TestingModule } from '@nestjs/testing';
import { DreamDictionaryController } from './dream_dictionary.controller';

describe('DreamDictionaryController', () => {
  let controller: DreamDictionaryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DreamDictionaryController],
    }).compile();

    controller = module.get<DreamDictionaryController>(DreamDictionaryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
