import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UploadImageDto } from './dto/upload-image.dto';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  async create(
    uploadImageDto: UploadImageDto,
    userId: number,
    filePath: string,
    fileName: string,
  ) {
    return this.prisma.hinh_anh.create({
      data: {
        ten_hinh: fileName,
        duong_dan: filePath,
        mo_ta: uploadImageDto.mo_ta,
        nguoi_dung_id: userId,
      },
    });
  }

  async createMultiple(
    uploadImageDto: UploadImageDto,
    userId: number,
    files: Express.Multer.File[],
  ) {
    const uploadedImages = [];
    for (const file of files) {
      const filePath = `/uploads/${file.filename}`;
      const image = await this.prisma.hinh_anh.create({
        data: {
          ten_hinh: file.filename,
          duong_dan: filePath,
          mo_ta: uploadImageDto.mo_ta,
          nguoi_dung_id: userId,
        },
      });
      uploadedImages.push(image);
    }
    return uploadedImages;
  }

  findAll() {
    return this.prisma.hinh_anh.findMany({
      include: { user: true },
    });
  }

  findOne(id: number) {
    return this.prisma.hinh_anh.findUnique({
      where: { hinh_id: id },
      include: { user: true },
    });
  }

  async remove(id: number, userId: number) {
    const image = await this.findOne(id);
    if (!image) {
      throw new NotFoundException('Image not found');
    }
    if (image.nguoi_dung_id !== userId) {
      throw new ForbiddenException('You can only delete your own images');
    }
    return this.prisma.hinh_anh.delete({
      where: { hinh_id: id },
    });
  }

  async searchByName(name: string) {
    return this.prisma.hinh_anh.findMany({
      where: {
        ten_hinh: {
          contains: name,
          // Bỏ thuộc tính mode và sử dụng raw query hoặc LOWER để không phân biệt hoa thường
        },
      },
    });
  }

  async getComments(imageId: number) {
    return this.prisma.binh_luan.findMany({
      where: { hinh_id: imageId },
      include: { user: true },
    });
  }

  async hasSaved(imageId: number, userId: number) {
    const savedImage = await this.prisma.luu_anh.findUnique({
      where: {
        nguoi_dung_id_hinh_id: {
          nguoi_dung_id: userId,
          hinh_id: imageId,
        },
      },
    });
    return !!savedImage;
  }
}
