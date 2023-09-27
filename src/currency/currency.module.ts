// src/currency/currency.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyController } from './currency.controller';
import { Currency } from 'src/entity/currency.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Currency])],
  controllers: [CurrencyController],
})
export class CurrencyModule {}
