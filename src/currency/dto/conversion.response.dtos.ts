import { ApiProperty } from '@nestjs/swagger';

export class ConversionResponseDto {
  @ApiProperty()
  originalCurrency: string;

  @ApiProperty()
  targetCurrency: string;

  @ApiProperty()
  convertedAmount: number;
}
