import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('telesale_statistic_api')
export class TelesaleStatisticAPI {

  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  telesale: string;

  @Column()
  sale: string;

  @Column()
  room: number;

  @Column()
  work_shift: number;

  @Column()
  number_call: number;

  @Column()
  number_care: number;

  constructor(telesale: string, sale: string, room: number, work_shift: number, number_call: number, number_care: number) {
    this.id = 0;
    this.telesale = telesale;
    this.sale = sale;
    this.room = room;
    this.work_shift = work_shift;
    this.number_call = number_call;
    this.number_care = number_care;
  }
}
