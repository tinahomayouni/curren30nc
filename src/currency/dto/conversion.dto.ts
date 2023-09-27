import { ApiProperty } from '@nestjs/swagger';

export class Conversion {
  @ApiProperty({ type: 'integer', format: 'int64' })
  id: number;

  @ApiProperty()
  currencyFrom: string;

  @ApiProperty()
  currencyTo: string;

  @ApiProperty({ type: 'number', format: 'double' })
  conversionRate: number;
}
