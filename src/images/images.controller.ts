import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Request,
  NotFoundException,
  UseInterceptors,
  UploadedFiles,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express'; // Sử dụng FilesInterceptor thay vì FileInterceptor
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ImagesService } from './images.service';
import { UploadImageDto } from './dto/upload-image.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiConsumes,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Upload nhiều hình ảnh' })
  @ApiResponse({
    status: 201,
    description: 'Các hình ảnh được upload thành công.',
  })
  @ApiResponse({ status: 401, description: 'Không được phép.' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload nhiều hình ảnh',
    type: 'multipart/form-data',
    schema: {
      type: 'object',
      properties: {
        files: {
          type: 'array', // Định nghĩa là array để hỗ trợ nhiều file
          items: {
            type: 'string',
            format: 'binary',
          },
        },
        mo_ta: {
          type: 'string',
          description: 'Mô tả hình ảnh',
          example: 'This is my image',
        },
      },
    },
  })
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(
    FilesInterceptor('files', 10, {
      // Sử dụng FilesInterceptor, giới hạn tối đa 10 file
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          cb(null, `${uniqueSuffix}${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
        if (!allowedTypes.includes(file.mimetype)) {
          return cb(
            new Error('Only image files (jpeg, png, gif) are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  @Post('upload')
  async uploadImages(
    // Đổi tên phương thức để rõ ràng hơn
    @Body() uploadImageDto: UploadImageDto,
    @UploadedFiles() files: Express.Multer.File[], // Sử dụng UploadedFiles thay vì UploadedFile
    @Request() req,
  ) {
    if (!files || files.length === 0) {
      throw new NotFoundException('At least one file is required');
    }

    // Gọi service để lưu từng hình ảnh
    const uploadedImages = await this.imagesService.createMultiple(
      uploadImageDto,
      req.user.nguoi_dung_id,
      files,
    );
    return uploadedImages;
  }

  @ApiOperation({ summary: 'Lấy danh sách tất cả hình ảnh' })
  @ApiResponse({ status: 200, description: 'Danh sách hình ảnh.' })
  @Get('get-list-images')
  getListImages() {
    return this.imagesService.findAll();
  }

  @ApiOperation({ summary: 'Lấy thông tin hình ảnh theo ID' })
  @ApiResponse({ status: 200, description: 'Thông tin hình ảnh.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy hình ảnh.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Xóa hình ảnh theo ID' })
  @ApiResponse({ status: 200, description: 'Xóa thành công.' })
  @ApiResponse({ status: 403, description: 'Không được phép.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy hình ảnh.' })
  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  remove(@Param('id') id: string, @Request() req) {
    return this.imagesService.remove(+id, req.user.nguoi_dung_id);
  }

  @ApiOperation({ summary: 'Tìm kiếm hình ảnh theo tên' })
  @ApiResponse({ status: 200, description: 'Danh sách hình ảnh phù hợp.' })
  @Get('search/:name')
  searchByName(@Param('name') name: string) {
    return this.imagesService.searchByName(name);
  }

  @ApiOperation({ summary: 'Lấy danh sách bình luận của hình ảnh' })
  @ApiResponse({ status: 200, description: 'Danh sách bình luận.' })
  @Get(':id/comments')
  getComments(@Param('id') id: string) {
    return this.imagesService.getComments(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Kiểm tra hình ảnh đã được lưu chưa' })
  @ApiResponse({ status: 200, description: 'Trạng thái lưu hình ảnh.' })
  @ApiResponse({ status: 401, description: 'Không được phép.' })
  @UseGuards(AuthGuard('jwt'))
  @Get(':id/saved')
  hasSaved(@Param('id') id: string, @Request() req) {
    return this.imagesService.hasSaved(+id, req.user.nguoi_dung_id);
  }
}
