import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('default')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Kiểm tra API' })
  @ApiResponse({ status: 200, description: 'Trả về thông điệp chào mừng.' })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
