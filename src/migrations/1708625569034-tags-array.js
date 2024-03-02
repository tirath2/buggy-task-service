const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class TagsArray1708625569034 {
    name = 'TagsArray1708625569034'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "tags" character varying array`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "tags" text`);
    }
}
