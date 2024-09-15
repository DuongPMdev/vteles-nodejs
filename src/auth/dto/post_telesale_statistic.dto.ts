import { ApiProperty } from '@nestjs/swagger';

export class PostTelesaleStatisticDTO {
  @ApiProperty({ example: '', description: 'telesale' })
  telesale: string;

  @ApiProperty({ example: '', description: 'sale' })
  sale: string;
  
  @ApiProperty({ example: 12, description: 'room' })
  room: number;
  
  @ApiProperty({ example: 12, description: 'work_shift' })
  work_shift: number;
  
  @ApiProperty({ example: 12, description: 'care' })
  care: number;
}