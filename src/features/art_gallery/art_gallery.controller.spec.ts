import { Test, TestingModule } from '@nestjs/testing';
import { ArtGalleryController } from './art_gallery.controller';

describe('ArtGalleryController', () => {
  let controller: ArtGalleryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArtGalleryController],
    }).compile();

    controller = module.get<ArtGalleryController>(ArtGalleryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
