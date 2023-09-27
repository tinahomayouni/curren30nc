import { Entity, PrimaryGeneratedColumn, Column, getRepository } from 'typeorm';

@Entity('currency')
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  currencyFrom: string;

  @Column()
  currencyTo: string;

  @Column({ nullable: true })
  conversionRate: number;

  // static async findByCurrencyName(
  //   currencyFrom: string,
  //   currencyTo: string,
  // ): Promise<Currency[]> {
  //   return this.createQueryBuilder('currency')
  //     .where('currency.currencyFrom = :currencyFrom', { currencyFrom })
  //     .andWhere('currency.currencyTo = :currencyTo', { currencyTo })
  //     .getMany();
  // }
}
