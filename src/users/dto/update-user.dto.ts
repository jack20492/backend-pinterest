import { IsString, IsInt, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: 'Họ tên của người dùng',
    example: 'Nguyen Van A',
    required: false,
  })
  @IsOptional()
  @IsString()
  ho_ten?: string;

  @ApiProperty({
    description: 'Tuổi của người dùng',
    example: 25,
    required: false,
  })
  @IsOptional()
  @IsInt()
  tuoi?: number;

  @ApiProperty({
    description: 'Đường dẫn ảnh đại diện',
    example: 'https://example.com/avatar.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  anh_dai_dien?: string;
}
