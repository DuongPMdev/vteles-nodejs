import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

@Entity('account')
export class Account {

  @PrimaryGeneratedColumn()
  @Exclude()
  id: number;

  @Column()
  account_id: string;

  @Column()
  display_name: string;
}
