import { Test, TestingModule } from '@nestjs/testing';
import { DreamDictionaryService } from './dream_dictionary.service';

describe('DreamDictionaryService', () => {
  let service: DreamDictionaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DreamDictionaryService],
    }).compile();

    service = module.get<DreamDictionaryService>(DreamDictionaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
