import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { CurrencyModule } from './currency/currency.module';

@Module({
  imports: [CurrencyModule, DatabaseModule],
})
export class AppModule {}
