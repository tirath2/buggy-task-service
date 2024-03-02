const { MigrationInterface, QueryRunner } = require('typeorm');

module.exports = class TaskStatusId1707119128501 {
  name = 'TaskStatusId1707119128501';

  async up(queryRunner) {
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "status"`);
    await queryRunner.query(`ALTER TABLE "tasks" ADD "status_id" integer`);
  }

  async down(queryRunner) {
    await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "status_id"`);
    await queryRunner.query(
      `ALTER TABLE "tasks" ADD "status" character varying NOT NULL DEFAULT 'open'`,
    );
  }
};
