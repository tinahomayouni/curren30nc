import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitCurrencyTable1695825359566 implements MigrationInterface {
  name = 'InitCurrencyTable1695825359566';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "currency" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "currencyFrom" varchar NOT NULL, "currencyTo" varchar NOT NULL, "conversionRate" integer)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "currency"`);
  }
}
