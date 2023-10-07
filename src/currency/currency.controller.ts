// src/currency/currency.controller.ts
import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { ConvertCurrenciesDTO } from './dto/currency.request.dtos';
import { ApiOperation } from '@nestjs/swagger';
import { ConversionResponseDto } from './dto/conversion.response.dtos';
import { CurrencyResponse } from './dto/currency.response.dto';
import { CurrencyDomain } from './domain/CurrencyDomain';
import { ExchangeRate } from 'src/entity/exchangeRate.entity';

@Controller()
export class CurrencyController {
  constructor() {}

  // @Get('save')
  // async save(
  //   @Query('from') from: string,
  //   @Query('to') to: string,
  //   @Query('rate') rate: string,
  // ) {
  //   const exchangeRate = new ExchangeRate();
  //   exchangeRate.currencyFrom = await Currency.upsert({ name: from }, ['name']);
  //   exchangeRate.currencyTo = await Currency.upsert({ name: to }, ['name']);
  //   exchangeRate.conversionRate = Number(rate);
  //   await exchangeRate.save();
  // }

  @Get('convert')
  @ApiOperation({ summary: 'convert currency' })
  async convertCurrency(
    @Query() query: ConvertCurrenciesDTO,
  ): Promise<ConversionResponseDto> {
    const { currencyFrom, currencyTo, amount } = query;

    const currencyPair = await ExchangeRate.findOne({
      where: {
        currencyFrom: {
          name: currencyFrom,
        },
        currencyTo: {
          name: currencyTo,
        },
      },
    });

    if (!currencyPair) {
      throw new BadRequestException(
        'Invalid currency pair or conversion rate not available.',
      );
    }

    const currencyDomain = new CurrencyDomain(
      currencyPair.currencyFrom.name,
      currencyPair.currencyTo.name,
      currencyPair.currencyFrom.label,
      currencyPair.currencyTo.label,
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
    const exchangeRates = await ExchangeRate.find();

    return exchangeRates.map((c) => {
      const currencyDomain = new CurrencyDomain(
        c.currencyFrom.name,
        c.currencyTo.name,
        c.currencyFrom.label,
        c.currencyTo.label,
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
