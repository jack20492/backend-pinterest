import { IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateCommentDto {
  @ApiProperty({
    description: 'Nội dung bình luận',
    example: 'Updated comment',
    required: false,
  })
  @IsOptional()
  @IsString()
  noi_dung?: string;
}
