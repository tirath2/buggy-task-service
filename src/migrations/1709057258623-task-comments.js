const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class TaskComments1709057258623 {
    name = 'TaskComments1709057258623'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task_comments" ADD "mentioned" integer array`);
        await queryRunner.query(`ALTER TABLE "task_comments" ADD "replied_to" integer`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "task_comments" DROP COLUMN "replied_to"`);
        await queryRunner.query(`ALTER TABLE "task_comments" DROP COLUMN "mentioned"`);
    }
}
