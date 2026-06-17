import { Test, TestingModule } from '@nestjs/testing';
import { ArtGalleryController } from './art_gallery.controller';
import { ArtGalleryService } from './art_gallery.service';

describe('ArtGalleryController', () => {
  let controller: ArtGalleryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtGalleryController],
      providers: [{ provide: ArtGalleryService, useValue: {} }],
    }).compile();

    controller = module.get<ArtGalleryController>(ArtGalleryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
