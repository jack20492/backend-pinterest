import { Module } from '@nestjs/common';
import { SavedImagesService } from './saved-images.service';
import { SavedImagesController } from './saved-images.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [SavedImagesController],
  providers: [SavedImagesService],
})
export class SavedImagesModule {}
