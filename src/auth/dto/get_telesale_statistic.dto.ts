import { ApiProperty } from '@nestjs/swagger';

export class GetTelesaleStatisticDTO {
  @ApiProperty({ example: '', description: 'Vhomes room' })
  room: number;
}