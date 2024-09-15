import { ApiProperty } from '@nestjs/swagger';

export class GetTelesaleStatisticDTO {
  @ApiProperty({ example: 12, description: 'Vhomes room' })
  room: number;
}