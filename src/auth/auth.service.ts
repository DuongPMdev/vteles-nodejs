import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TelesaleStatisticAPI } from './entity/telesale_statistic_api.entity';
import { classToPlain } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(TelesaleStatisticAPI)
    private telesaleStatisticAPIRepository: Repository<TelesaleStatisticAPI>,
  ) {}
  
  async getTelesaleStatistic(room: number) {
    const telesaleStatisticAPIs = await this.telesaleStatisticAPIRepository.find({ where: { room: room } });
    return classToPlain(telesaleStatisticAPIs);
  }

}