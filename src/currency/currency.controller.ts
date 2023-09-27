// src/currency/currency.controller.ts
import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { Currency } from 'src/entity/currency.entity';
import { ConvertCurrenciesDTO } from './dto/currency.request.dtos';
import { ApiOperation } from '@nestjs/swagger';
import { ConversionResponseDto } from './dto/conversion.response.dtos';

@Controller()
export class CurrencyController {
  constructor() {}

  @Get('save')
  async save(
    @Query('from') from: string,
    @Query('to') to: string,
    @Query('rate') rate: string,
  ) {
    const currency = new Currency();
    currency.currencyFrom = from;
    currency.currencyTo = to;
    currency.conversionRate = Number(rate);
    await currency.save();
  }

  @Get('convert')
  @ApiOperation({ summary: 'convert currency' })
  async convertCurrency(
    @Query() query: ConvertCurrenciesDTO,
  ): Promise<ConversionResponseDto> {
    const { currencyFrom, currencyTo, amount } = query;

    if (currencyFrom === currencyTo) {
      throw new BadRequestException(
        'CurrencyFrom and CurrencyTo must be different.',
      );
    }

    const currencyPair = await Currency.findOne({
      where: {
        currencyFrom,
        currencyTo,
      },
    });

    if (!currencyPair || currencyPair.conversionRate === null) {
      throw new BadRequestException(
        'Invalid currency pair or conversion rate not available.',
      );
    }

    const convertedAmount = amount * currencyPair.conversionRate;
    return {
      originalCurrency: currencyFrom,
      targetCurrency: currencyTo,
      convertedAmount: convertedAmount,
    };
  }

  @Get('currencies')
  @ApiOperation({ summary: 'Get a list of currencies' })
  async getAllCurrencies(): Promise<string[]> {
    const currencies = await Currency.find();
    const currencyPairs = currencies.map(
      (currency) => `${currency.currencyFrom} -> ${currency.currencyTo}`,
    );
    return currencyPairs;
  }
}
