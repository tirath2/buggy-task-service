const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class SprintDetails1708190987402 {
    name = 'SprintDetails1708190987402'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "sprint_details" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "project_id" integer NOT NULL, "duration" integer NOT NULL, "auto_create_sprint" boolean NOT NULL DEFAULT false, "start_time" TIMESTAMP, "pause_till" TIMESTAMP, CONSTRAINT "PK_43162b911bbf8ab335ec1be3f23" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "sprint_details"`);
    }
}
