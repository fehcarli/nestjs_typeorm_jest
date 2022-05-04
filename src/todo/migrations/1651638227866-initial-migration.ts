import {MigrationInterface, QueryRunner} from "typeorm";

export class initialMigration1651638227866 implements MigrationInterface {
    name = 'initialMigration1651638227866'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "todos" (
            "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), 
            "task" character varying(300) NOT NULL, 
            "is_done" boolean NOT NULL, 
            "created_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "updated_at" TIMESTAMP NOT NULL DEFAULT now(), 
            "deleted_at" TIMESTAMP, CONSTRAINT "PK_74f598342366965330edd84981d" PRIMARY KEY ("uuid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "todos"`);
    }

}
