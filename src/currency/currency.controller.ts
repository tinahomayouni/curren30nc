// src/currency/currency.controller.ts
import { Controller, Get, Query, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Currency } from 'src/entity/currency.entity';
import { ConvertCurrenciesDTO } from './dto/currency.request.dtos';
import { ApiOkResponse, ApiOperation } from '@nestjs/swagger';
import { Conversion } from './dto/conversion.dto';

@Controller()
export class CurrencyController {
  constructor(
    @InjectRepository(Currency)
    private readonly currencyRepository: Repository<Currency>,
  ) {}

  @Get('convert')
  async convertCurrency(@Query() query: ConvertCurrenciesDTO) {
    const { currencyFrom, currencyTo, amount } = query;

    if (currencyFrom === currencyTo) {
      throw new BadRequestException(
        'CurrencyFrom and CurrencyTo must be different.',
      );
    }

    const currencyPair = await this.currencyRepository.findOne({
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
  @ApiOkResponse({ type: [Conversion] }) // Use your DTO here
  async getAllCurrencies() {
    const currencies = await this.currencyRepository.find();
    const currencyPairs = currencies.map(
      (currency) => `${currency.currencyFrom} -> ${currency.currencyTo}`,
    );
    return currencyPairs;
  }
}
