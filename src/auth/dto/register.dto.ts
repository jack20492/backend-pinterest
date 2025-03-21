import { IsString, IsEmail, IsInt, IsOptional, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Email của người dùng', example: 'user@example.com' })
  @IsEmail({}, { message: 'Email không hợp lệ' })
  email: string;

  @ApiProperty({ description: 'Mật khẩu của người dùng', example: 'password123' })
  @IsString()
  @MinLength(6, { message: 'Mật khẩu phải có ít nhất 6 ký tự' })
  mat_khau: string;

  @ApiProperty({ description: 'Họ tên của người dùng', example: 'Nguyen Van A' })
  @IsString()
  ho_ten: string;

  @ApiProperty({ description: 'Tuổi của người dùng', example: 25, required: false })
  @IsOptional()
  @IsInt()
  tuoi?: number;

  @ApiProperty({ description: 'Đường dẫn ảnh đại diện', example: 'https://example.com/avatar.jpg', required: false })
  @IsOptional()
  @IsString()
  anh_dai_dien?: string;
}