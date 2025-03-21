import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { SavedImagesService } from './saved-images.service';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('saved-images')
@Controller('saved-images')
export class SavedImagesController {
  constructor(private readonly savedImagesService: SavedImagesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lưu hình ảnh' })
  @ApiResponse({ status: 201, description: 'Hình ảnh được lưu thành công.' })
  @ApiResponse({ status: 401, description: 'Không được phép.' })
  @UseGuards(AuthGuard('jwt'))
  @Post()
  saveImage(@Body() body: { hinh_id: number }, @Request() req) {
    return this.savedImagesService.saveImage(
      req.user.nguoi_dung_id,
      body.hinh_id,
    );
  }
}
