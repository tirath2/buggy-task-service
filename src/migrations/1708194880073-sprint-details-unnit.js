const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class SprintDetailsUnnit1708194880073 {
    name = 'SprintDetailsUnnit1708194880073'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "sprint_details" ADD "duration_unit" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sprint_details" ADD "duration_in_days" integer NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "sprint_details" DROP COLUMN "duration_in_days"`);
        await queryRunner.query(`ALTER TABLE "sprint_details" DROP COLUMN "duration_unit"`);
    }
}
