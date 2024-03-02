const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class SprintExtentions1708710787812 {
    name = 'SprintExtentions1708710787812'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "sprint_extensions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "project_id" integer NOT NULL, "duration" integer NOT NULL, "extended_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_a22cd493e47ecef966d06bff1fb" PRIMARY KEY ("id"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "sprint_extensions"`);
    }
}
