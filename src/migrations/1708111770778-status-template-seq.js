const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class StatusTemplateSeq1708111770778 {
    name = 'StatusTemplateSeq1708111770778'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "template_status" ALTER COLUMN "sequence" DROP NOT NULL`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "template_status" ALTER COLUMN "sequence" SET NOT NULL`);
    }
}
