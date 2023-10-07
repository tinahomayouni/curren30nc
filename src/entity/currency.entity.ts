import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';

@Entity('currency')
export class Currency extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  label: string;

  constructor(params: Partial<Currency>) {
    super();
    Object.assign(this, params);
  }
}
