const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Initail1707033329825 {
    name = 'Initail1707033329825'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "title" character varying NOT NULL, "description" text, "parent_task_id" integer, "status" character varying NOT NULL DEFAULT 'open', "project_id" integer NOT NULL, "type" character varying NOT NULL DEFAULT 'STORY', "parentTaskId" integer, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_comments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "task_id" integer NOT NULL, "comment" text NOT NULL, CONSTRAINT "PK_83b99b0b03db29d4cafcb579b77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_tasks" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "user_id" integer NOT NULL, "task_id" integer NOT NULL, CONSTRAINT "PK_dd5ebb5c408af74cba775bd2326" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_34701b0b8d466af308ba202e4ef" FOREIGN KEY ("parentTaskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_34701b0b8d466af308ba202e4ef"`);
        await queryRunner.query(`DROP TABLE "user_tasks"`);
        await queryRunner.query(`DROP TABLE "task_comments"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
    }
}
