// src/currency/currency.controller.ts
import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { Currency } from 'src/entity/currency.entity';
import { ConvertCurrenciesDTO } from './dto/currency.request.dtos';
import { ApiOperation } from '@nestjs/swagger';
import { ConversionResponseDto } from './dto/conversion.response.dtos';
import { CurrencyResponse } from './dto/currency.response.dto';
import { CurrencyDomain } from './domain/CurrencyDomain';

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

    const currencyPair = await Currency.findOne({
      where: {
        currencyFrom,
        currencyTo,
      },
    });

    if (!currencyPair) {
      throw new BadRequestException(
        'Invalid currency pair or conversion rate not available.',
      );
    }

    const currencyDomain = new CurrencyDomain(
      currencyPair.currencyFrom,
      currencyPair.currencyTo,
      currencyPair.fromLabel,
      currencyPair.toLabel,
      currencyPair.conversionRate,
    );

    const convertedAmount = amount * currencyDomain.conversionRate;
    return {
      from: currencyDomain.from,
      fromLabel: currencyDomain.fromLabel,
      to: currencyDomain.to,
      toLabel: currencyDomain.toLabel,
      convertedAmount,
    };
  }

  @Get('currencies')
  @ApiOperation({ summary: 'Get a list of currencies' })
  async getAllCurrencies(): Promise<CurrencyResponse[]> {
    const currencies = await Currency.find();

    return currencies.map((c) => {
      const currencyDomain = new CurrencyDomain(
        c.currencyFrom,
        c.currencyTo,
        c.fromLabel,
        c.toLabel,
        c.conversionRate,
      );

      return {
        from: currencyDomain.from,
        to: currencyDomain.to,
        fromLabel: currencyDomain.fromLabel,
        toLabel: currencyDomain.toLabel,
      };
    });
  }
}
