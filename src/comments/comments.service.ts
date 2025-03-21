import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(private prisma: PrismaService) {}

  create(createCommentDto: CreateCommentDto, userId: number) {
    return this.prisma.binh_luan.create({
      data: {
        nguoi_dung_id: userId,
        hinh_id: createCommentDto.hinh_id,
        ngay_binh_luan: new Date(),
        noi_dung: createCommentDto.noi_dung,
      },
    });
  }
}
