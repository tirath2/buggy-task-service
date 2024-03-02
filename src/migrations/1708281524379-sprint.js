const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Sprint1708281524379 {
    name = 'Sprint1708281524379'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "sprints" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "name" character varying NOT NULL, "status" character varying NOT NULL, "project_id" integer NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_6800aa2e0f508561812c4b9afb4" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "sprints"`);
    }
}
