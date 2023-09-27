import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  BaseEntity,
  Like,
} from 'typeorm';

@Entity('currency')
export class Currency extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  currencyFrom: string;

  @Column()
  currencyTo: string;

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
