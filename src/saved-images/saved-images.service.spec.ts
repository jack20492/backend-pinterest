import { Test, TestingModule } from '@nestjs/testing';
import { SavedImagesService } from './saved-images.service';

describe('SavedImagesService', () => {
  let service: SavedImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SavedImagesService],
    }).compile();

    service = module.get<SavedImagesService>(SavedImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
