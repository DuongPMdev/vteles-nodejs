import { Controller, Post, Get, Body, Request, UseGuards, Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { GetTelesaleStatisticDTO } from './dto/get_telesale_statistic.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';


@Injectable()
@ApiTags('account')
@Controller('account')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  
  @UseGuards(JwtAuthGuard)
  @Get('get_telesale_statistic')
  @ApiOperation({ summary: 'Get telesales statistic' })
  @ApiResponse({ status: 200, description: 'Successful Get telesales statistic'})
  async getTelesaleStatistic(@Body() getTelesaleStatisticDTO: GetTelesaleStatisticDTO) {
    const room = getTelesaleStatisticDTO.room;
    const results = this.authService.getTelesaleStatistic(room);
    return { "message": "", "results": results };
  }
}