import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddExchangeRateTable1696678375995 implements MigrationInterface {
  name = 'AddExchangeRateTable1696678375995';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "currency" RENAME TO "old_currency"`);

    // Create new currency table
    await queryRunner.query(`
        CREATE TABLE "currency" (
            "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            "name" varchar NOT NULL UNIQUE,
            "label" varchar NOT NULL
        )
    `);

    // Create exchangeRate table
    await queryRunner.query(`
        CREATE TABLE "exchangeRate" (
            "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
            "currencyFromId" integer NOT NULL REFERENCES "currency"("id"),
            "currencyToId" integer NOT NULL REFERENCES "currency"("id"),
            "conversionRate" number NOT NULL
        )
    `);

    // Migrating data:
    console.log(
      await queryRunner.query(
        `SELECT DISTINCT "currencyFrom", "fromLabel" FROM "old_currency"`,
      ),
    );
    // 1. Migrate distinct currencies to the new currency table
    // await queryRunner.query(`
    //     INSERT INTO "currency"("name", "label")
    //     SELECT DISTINCT "currencyFrom", "fromLabel" FROM "old_currency"
    // `);

    // await queryRunner.query(`
    //     INSERT INTO "currency"("name", "label")
    //     SELECT DISTINCT "currencyTo", "toLabel" FROM "old_currency"
    //     WHERE "currencyTo" NOT IN (SELECT "name" FROM "currency")
    // `);

    // 2. Migrate exchange rates to the new exchangeRate table
    // await queryRunner.query(`
    //     INSERT INTO "exchangeRate"("currencyFromId", "currencyToId", "conversionRate")
    //     SELECT
    //         (SELECT "id" FROM "currency" WHERE "name" = o."currencyFrom"),
    //         (SELECT "id" FROM "currency" WHERE "name" = o."currencyTo"),
    //         o."conversionRate"
    //     FROM "old_currency" o
    // `);

    // Drop the old table
    await queryRunner.query(`DROP TABLE "old_currency"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "exchangeRate"`);
    await queryRunner.query(`DROP TABLE "currency"`);

    // Recreate the original currency table or any other rollback operations you'd like to perform
    await queryRunner.query(`
            CREATE TABLE "currency" (
                "id" integer PRIMARY KEY AUTOINCREMENT NOT NULL,
                "currencyFrom" varchar NOT NULL,
                "currencyTo" varchar NOT NULL,
                "conversionRate" number NOT NULL,
                "fromLabel" varchar NOT NULL DEFAULT '',
                "toLabel" varchar NOT NULL DEFAULT '',
                CONSTRAINT "uniqueExchange" UNIQUE ("currencyFrom", "currencyTo")
            )
        `);
  }
}
