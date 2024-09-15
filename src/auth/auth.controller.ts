import { Controller, Post, Get, Body, Request, UseGuards, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { GetTelesaleStatisticDTO } from './dto/get_telesale_statistic.dto';
import { PostTelesaleStatisticDTO } from './dto/post_telesale_statistic.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';


@Injectable()
@ApiTags('api')
@Controller('api')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @Post('get_telesale_statistic')
  @ApiOperation({ summary: 'Get telesales statistic' })
  @ApiResponse({ status: 200, description: 'Successful Get telesales statistic'})
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async getTelesaleStatistic(@Request() req, @Body() getTelesaleStatisticDTO: GetTelesaleStatisticDTO) {
    const room = getTelesaleStatisticDTO.room;
    const results = await this.authService.getTelesaleStatistic(room);
    return { "message": "", "results": results };
  }
  
  @Post('post_telesale_statistic')
  @ApiOperation({ summary: 'Post telesales statistic' })
  @ApiResponse({ status: 200, description: 'Successful Get telesales statistic'})
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  async postTelesaleStatistic(@Request() req, @Body() postTelesaleStatisticDTO: PostTelesaleStatisticDTO) {
    const telesale = postTelesaleStatisticDTO.telesale;
    const sale = postTelesaleStatisticDTO.sale;
    const room = postTelesaleStatisticDTO.room;
    const work_shift = postTelesaleStatisticDTO.work_shift;
    const care = postTelesaleStatisticDTO.care;
    const result = await this.authService.postTelesaleStatistic(telesale, sale, room, work_shift, care);
    return { };
  }
}