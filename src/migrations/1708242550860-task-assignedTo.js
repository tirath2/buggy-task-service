const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class TaskAssignedTo1708242550860 {
    name = 'TaskAssignedTo1708242550860'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "assigned_to" character varying`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "due_date" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "priority" character varying NOT NULL DEFAULT 'Low'`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "tags" text`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "estimatedTime" interval`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "actualTime" interval`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "actualTime"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "estimatedTime"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "priority"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "due_date"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "assigned_to"`);
    }
}
