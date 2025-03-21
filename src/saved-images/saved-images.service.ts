import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SavedImagesService {
  constructor(private prisma: PrismaService) {}

  async saveImage(userId: number, imageId: number) {
    return this.prisma.luu_anh.create({
      data: {
        nguoi_dung_id: userId,
        hinh_id: imageId,
        ngay_luu: new Date(),
      },
    });
  }
}
