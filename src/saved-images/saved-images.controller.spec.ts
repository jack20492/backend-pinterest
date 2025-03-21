import { Test, TestingModule } from '@nestjs/testing';
import { SavedImagesController } from './saved-images.controller';
import { SavedImagesService } from './saved-images.service';

describe('SavedImagesController', () => {
  let controller: SavedImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SavedImagesController],
      providers: [SavedImagesService],
    }).compile();

    controller = module.get<SavedImagesController>(SavedImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
