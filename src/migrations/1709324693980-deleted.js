const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Deleted1709324693980 {
    name = 'Deleted1709324693980'

    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tasks" ADD "deleted_by" integer`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task_comments" ADD "deleted_by" integer`);
        await queryRunner.query(`ALTER TABLE "task_comments" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD "deleted_by" integer`);
        await queryRunner.query(`ALTER TABLE "user_tasks" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "task_status" ADD "deleted_by" integer`);
        await queryRunner.query(`ALTER TABLE "task_status" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "templates" ADD "deleted_by" integer`);
        await queryRunner.query(`ALTER TABLE "templates" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "template_status" ADD "deleted_by" integer`);
        await queryRunner.query(`ALTER TABLE "template_status" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "sprint_details" ADD "deleted_by" integer`);
        await queryRunner.query(`ALTER TABLE "sprint_details" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "sprints" ADD "deleted_by" integer`);
        await queryRunner.query(`ALTER TABLE "sprints" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "sprint_extensions" ADD "deleted_by" integer`);
        await queryRunner.query(`ALTER TABLE "sprint_extensions" ADD "deleted_at" TIMESTAMP`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "sprint_extensions" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "sprint_extensions" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "sprints" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "sprints" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "sprint_details" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "sprint_details" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "template_status" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "template_status" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "templates" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "task_status" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "task_status" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "user_tasks" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "task_comments" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "task_comments" DROP COLUMN "deleted_by"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP COLUMN "deleted_by"`);
    }
}
