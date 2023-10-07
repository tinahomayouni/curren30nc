import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Like,
  Unique,
} from 'typeorm';

@Entity('currency')
@Unique('uniqueExchange', ['currencyFrom', 'currencyTo'])
export class Currency extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  currencyFrom: string;

  @Column({ default: '' })
  fromLabel: string;

  @Column()
  currencyTo: string;

  @Column({ default: '' })
  toLabel: string;

  @Column({ nullable: true })
  conversionRate: number;

  static async getAllCurrenciesStartingWithA(): Promise<Currency[]> {
    return this.find({
      where: {
        currencyFrom: Like('A%'),
      },
    }); // Use TypeORM's find method to retrieve all currencies
  }
}
