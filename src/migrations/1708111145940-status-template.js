const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class StatusTemplate1708111145940 {
    name = 'StatusTemplate1708111145940'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "task_status" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "name" character varying NOT NULL, "project_id" integer, CONSTRAINT "PK_b8747cc6a41b6cef4639babf61d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "template_status" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "template_id" integer NOT NULL, "task_status_id" integer NOT NULL, "task_status_name" character varying NOT NULL, "sequence" integer NOT NULL, "next" json NOT NULL, "role_that_can_override" json NOT NULL, "is_end" boolean NOT NULL, CONSTRAINT "PK_c23979585f2735b28592aa88565" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "status_id" SET NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tasks" ALTER COLUMN "status_id" DROP NOT NULL`);
        await queryRunner.query(`DROP TABLE "template_status"`);
        await queryRunner.query(`DROP TABLE "task_status"`);
    }
}
