import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsString,
  IsNumber,
  IsNotEmpty,
  IsNumberString,
  Length,
} from 'class-validator';
import { DontMatch, helloMessage } from 'src/utils/validators';

export class ConvertCurrenciesDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  currencyFrom: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  @DontMatch('comment', { message: helloMessage }) //usage by @
  currencyTo: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  conversionRate: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  amount: number;
}
