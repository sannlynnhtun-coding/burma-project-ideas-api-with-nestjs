import { Test, TestingModule } from '@nestjs/testing';
import { ArtGalleryService } from './art_gallery.service';

describe('ArtGalleryService', () => {
  let service: ArtGalleryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArtGalleryService],
    }).compile();

    service = module.get<ArtGalleryService>(ArtGalleryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
