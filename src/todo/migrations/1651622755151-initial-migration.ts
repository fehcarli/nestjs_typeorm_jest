import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1651622755151 implements MigrationInterface {
    name = 'initialMigration1651622755151'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todos" (
            "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "task" character varying(300) NOT NULL, "is_done" boolean NOT NULL, 
            "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "deleted_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
            CONSTRAINT "PK_0a5875eb5ec460206c670c3b62d" PRIMARY KEY ("uuid"))`
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "todos"`);
    }

}
