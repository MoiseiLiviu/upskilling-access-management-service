import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddUser1682427369064 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        CREATE TABLE "user" (
        id BIGSERIAL NOT NULL,
        email character varying NOT NULL,
        password text NOT NULL,
        last_login TIMESTAMP,
        hash_refresh_token character varying,
        created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        CONSTRAINT "UQ_b67337b7f8aa8406e936c2ff754" UNIQUE (email),
        CONSTRAINT "PK_03b91d2b8321aa7ba32257dc321" PRIMARY KEY (id)
);
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "public"."user"`);
  }
}
