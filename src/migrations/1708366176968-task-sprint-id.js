const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class TaskSprintId1708366176968 {
    name = 'TaskSprintId1708366176968'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "sprint_id" integer`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "sprint_id"`);
    }
}
