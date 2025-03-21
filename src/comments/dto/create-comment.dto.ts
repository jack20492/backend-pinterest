import { IsInt, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ description: 'ID của hình ảnh', example: 1 })
  @IsInt()
  hinh_id: number;

  @ApiProperty({ description: 'Nội dung bình luận', example: 'Nice image!' })
  @IsString()
  noi_dung: string;
}
