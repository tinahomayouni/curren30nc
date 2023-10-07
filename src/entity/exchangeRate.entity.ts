import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  ManyToOne,
} from 'typeorm';
import { Currency } from './currency.entity';

@Entity('exchangeRate')
export class ExchangeRate extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Currency, { eager: true })
  currencyFrom: Currency;

  @ManyToOne(() => Currency, { eager: true })
  currencyTo: Currency;

  @Column()
  conversionRate: number;
}
