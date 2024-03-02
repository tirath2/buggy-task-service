const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Status1707056052799 {
    name = 'Status1707056052799'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "task-status" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "name" character varying NOT NULL, "project_id" integer, CONSTRAINT "PK_3df518d1f55d2287f959d685877" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "templates" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "name" character varying NOT NULL, "project_id" integer, CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "template-status" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "template_id" integer NOT NULL, "task_status_id" integer NOT NULL, "task_status_name" character varying NOT NULL, CONSTRAINT "PK_2ebd58cd55ea1ad26b9f1a66f64" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "template-status"`);
        await queryRunner.query(`DROP TABLE "templates"`);
        await queryRunner.query(`DROP TABLE "task-status"`);
    }
}
