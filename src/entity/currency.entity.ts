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

  // static async getAllCurrencies(): Promise<Currency[]> {
  //   return this.find(); // Use TypeORM's find method to retrieve all currencies
  // }
}
