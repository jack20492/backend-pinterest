import { ApiProperty } from '@nestjs/swagger';

export class UploadImageRequestDto {
  @ApiProperty({
    type: 'array',
    items: {
      type: 'string',
      format: 'binary',
    },
    description: 'Danh sách file hình ảnh để upload',
  })
  files: any; // Sử dụng any vì đây là file, không cần validate

  @ApiProperty({
    description: 'Mô tả hình ảnh',
    example: 'This is my image',
    required: false,
  })
  mo_ta?: string;
}
