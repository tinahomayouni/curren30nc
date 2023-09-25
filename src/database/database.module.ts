// database.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Currency } from 'src/entity/currency.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'src/database/sqlite.db',
      entities: [Currency],
      synchronize: true,
    }),
  ],
})
export class DatabaseModule {}
