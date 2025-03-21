import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.mat_khau, 10);
    return this.prisma.nguoi_dung.create({
      data: {
        email: createUserDto.email,
        mat_khau: hashedPassword,
        ho_ten: createUserDto.ho_ten,
        tuoi: createUserDto.tuoi,
        anh_dai_dien: createUserDto.anh_dai_dien,
      },
    });
  }

  findAll() {
    return this.prisma.nguoi_dung.findMany();
  }

  findOne(id: number) {
    return this.prisma.nguoi_dung.findUnique({
      where: { nguoi_dung_id: id },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.nguoi_dung.findUnique({
      where: { email },
    });
  }

  async getSavedImages(userId: number) {
    return this.prisma.luu_anh.findMany({
      where: { nguoi_dung_id: userId },
      include: { image: true },
    });
  }

  async getUserImages(userId: number) {
    return this.prisma.hinh_anh.findMany({
      where: { nguoi_dung_id: userId },
    });
  }

  async update(id: number, updateUserDto: any) {
    return this.prisma.nguoi_dung.update({
      where: { nguoi_dung_id: id },
      data: updateUserDto,
    });
  }
}
