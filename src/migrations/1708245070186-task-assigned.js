const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class TaskAssigned1708245070186 {
    name = 'TaskAssigned1708245070186'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "assigned_to"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "assigned_to" integer`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "assigned_to"`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "assigned_to" character varying`);
    }
}
