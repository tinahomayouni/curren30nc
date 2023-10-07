import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddFromAndToLabels1696675222106 implements MigrationInterface {
  name = 'AddFromAndToLabels1696675222106';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "temporary_currency" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "currencyFrom" varchar NOT NULL, "currencyTo" varchar NOT NULL, "conversionRate" integer, "fromLabel" varchar NOT NULL DEFAULT (''), "toLabel" varchar NOT NULL DEFAULT (''))`,
    );
    await queryRunner.query(
      `INSERT INTO "temporary_currency"("id", "currencyFrom", "currencyTo", "conversionRate") SELECT "id", "currencyFrom", "currencyTo", "conversionRate" FROM "currency"`,
    );
    await queryRunner.query(`DROP TABLE "currency"`);
    await queryRunner.query(
      `ALTER TABLE "temporary_currency" RENAME TO "currency"`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "currency" RENAME TO "temporary_currency"`,
    );
    await queryRunner.query(
      `CREATE TABLE "currency" ("id" integer PRIMARY KEY AUTOINCREMENT NOT NULL, "currencyFrom" varchar NOT NULL, "currencyTo" varchar NOT NULL, "conversionRate" integer)`,
    );
    await queryRunner.query(
      `INSERT INTO "currency"("id", "currencyFrom", "currencyTo", "conversionRate") SELECT "id", "currencyFrom", "currencyTo", "conversionRate" FROM "temporary_currency"`,
    );
    await queryRunner.query(`DROP TABLE "temporary_currency"`);
  }
}
