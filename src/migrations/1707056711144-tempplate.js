const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Tempplate1707056711144 {
    name = 'Tempplate1707056711144'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "template-status" ADD "sequence" integer NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "template-status" DROP COLUMN "sequence"`);
    }
}
