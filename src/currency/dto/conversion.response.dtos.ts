import { ApiProperty } from '@nestjs/swagger';

export class ConversionResponseDto {
  @ApiProperty()
  from: string;
  @ApiProperty()
  fromLabel: string;

  @ApiProperty()
  to: string;
  @ApiProperty()
  toLabel: string;

  @ApiProperty()
  convertedAmount: number;
}
