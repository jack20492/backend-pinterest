import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  UseGuards,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Lấy danh sách tất cả người dùng' })
  @ApiResponse({ status: 200, description: 'Danh sách người dùng.' })
  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({ summary: 'Lấy thông tin người dùng theo ID' })
  @ApiResponse({ status: 200, description: 'Thông tin người dùng.' })
  @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng.' })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Lấy thông tin người dùng hiện tại' })
  @ApiResponse({ status: 200, description: 'Thông tin người dùng hiện tại.' })
  @ApiResponse({ status: 401, description: 'Không được phép.' })
  @UseGuards(AuthGuard('jwt'))
  @Get('me')
  getProfile(@Request() req) {
    return this.usersService.findOne(req.user.nguoi_dung_id);
  }

  @ApiOperation({ summary: 'Lấy danh sách ảnh đã lưu của người dùng' })
  @ApiResponse({ status: 200, description: 'Danh sách ảnh đã lưu.' })
  @Get(':id/saved-images')
  getSavedImages(@Param('id') id: string) {
    return this.usersService.getSavedImages(+id);
  }

  @ApiOperation({ summary: 'Lấy danh sách ảnh đã tạo của người dùng' })
  @ApiResponse({ status: 200, description: 'Danh sách ảnh đã tạo.' })
  @Get(':id/images')
  getUserImages(@Param('id') id: string) {
    return this.usersService.getUserImages(+id);
  }

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Cập nhật thông tin người dùng' })
  @ApiResponse({ status: 200, description: 'Cập nhật thành công.' })
  @ApiResponse({ status: 403, description: 'Không được phép.' })
  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: any, @Request() req) {
    if (req.user.nguoi_dung_id !== +id) {
      throw new ForbiddenException('You can only update your own profile');
    }
    return this.usersService.update(+id, updateUserDto);
  }
}
