import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Account } from './auth/entity/account.entity';
import { TelesaleStatisticAPI } from './auth/entity/telesale_statistic_api.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'duongpm13',
      password: 'Vhomes5555@',
      database: 'vteles',
      entities: [ Account, TelesaleStatisticAPI ],
      synchronize: false, // never change it to true : true will force clear db
    }),
    TypeOrmModule.forFeature([Account, TelesaleStatisticAPI]),
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}