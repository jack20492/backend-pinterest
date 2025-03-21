import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UploadImageDto {
  @ApiProperty({ description: 'Mô tả hình ảnh', example: 'This is my image', required: false })
  @IsOptional()
  @IsString()
  mo_ta?: string;
}