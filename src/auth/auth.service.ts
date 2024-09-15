import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Account } from './entity/account.entity';
import { TelesaleStatisticAPI } from './entity/telesale_statistic_api.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Account)
    private accountRepository: Repository<Account>,
    @InjectRepository(TelesaleStatisticAPI)
    private telesaleStatisticAPIRepository: Repository<TelesaleStatisticAPI>,
  ) {}
  
  async getTelesaleStatistic(room: number) {
    const telesaleStatisticAPIs = await this.telesaleStatisticAPIRepository.find({ where: { room: room } });
    
    for (const telesaleStatisticAPI of telesaleStatisticAPIs) {
      const account = await this.accountRepository.findOne({ where: { account_id: telesaleStatisticAPI.telesale } });
      telesaleStatisticAPI["display_name"] = account.display_name;
    }
    return telesaleStatisticAPIs;
  }
  
  async postTelesaleStatistic(telesale: string, sale: string, room: number, work_shift: number, care: number) {
    let telesaleStatisticAPI = await this.telesaleStatisticAPIRepository.findOne({ where: { telesale: telesale, sale: sale, room: room, work_shift: work_shift } });
    if (telesaleStatisticAPI == null) {
      telesaleStatisticAPI = new TelesaleStatisticAPI(telesale, sale, room, work_shift, 0, 0);
    }
    telesaleStatisticAPI.number_call++;
    if (care > 0) {
      telesaleStatisticAPI.number_care++;
    }
    await this.telesaleStatisticAPIRepository.save(telesaleStatisticAPI);
    return telesaleStatisticAPI;
  }

}