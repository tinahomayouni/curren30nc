import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';
import { DontMatch } from 'src/utils/validators';

export class ConvertCurrenciesDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  currencyFrom: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @DontMatch('currencyFrom') //usage by @
  currencyTo: string;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
