import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateImageDto {
  @ApiProperty({
    description: 'Tên hình ảnh',
    example: 'My Image',
    required: false,
  })
  @IsOptional()
  @IsString()
  ten_hinh?: string;

  @ApiProperty({
    description: 'Đường dẫn hình ảnh',
    example: 'https://example.com/image.jpg',
    required: false,
  })
  @IsOptional()
  @IsString()
  duong_dan?: string;

  @ApiProperty({
    description: 'Mô tả hình ảnh',
    example: 'This is my image',
    required: false,
  })
  @IsOptional()
  @IsString()
  mo_ta?: string;
}
