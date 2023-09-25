import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Currency {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  currencyFrom: string;

  @Column()
  currencyTo: string;

  @Column()
  conversionRate: number;
}
