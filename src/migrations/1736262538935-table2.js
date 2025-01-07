const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Table21736262538935 {
    name = 'Table21736262538935'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "tasks" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "deleted_by" integer, "deleted_at" TIMESTAMP, "title" character varying NOT NULL, "description" text, "parent_task_id" integer, "status_id" integer NOT NULL, "project_id" integer NOT NULL, "assigned_to" integer, "due_date" TIMESTAMP, "task_priority_id" integer, "tags" character varying array, "estimatedTime" interval, "actualTime" interval, "sprint_id" integer, "task_type_id" integer, "parentTaskId" integer, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_comments" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "deleted_by" integer, "deleted_at" TIMESTAMP, "task_id" integer NOT NULL, "comment" text NOT NULL, "mentioned" integer array, "replied_to" integer, CONSTRAINT "PK_83b99b0b03db29d4cafcb579b77" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_tasks" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "deleted_by" integer, "deleted_at" TIMESTAMP, "user_id" integer NOT NULL, "task_id" integer NOT NULL, CONSTRAINT "PK_dd5ebb5c408af74cba775bd2326" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_status" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "deleted_by" integer, "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "project_id" integer, "color_code" character varying, CONSTRAINT "PK_b8747cc6a41b6cef4639babf61d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "templates" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "deleted_by" integer, "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "project_id" integer, CONSTRAINT "PK_515948649ce0bbbe391de702ae5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "template_status" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "deleted_by" integer, "deleted_at" TIMESTAMP, "template_id" integer NOT NULL, "task_status_id" integer NOT NULL, "task_status_name" character varying NOT NULL, "sequence" integer, "next" json NOT NULL, "role_that_can_override" json NOT NULL, "is_end" boolean NOT NULL, CONSTRAINT "PK_c23979585f2735b28592aa88565" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sprint_details" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "deleted_by" integer, "deleted_at" TIMESTAMP, "project_id" integer NOT NULL, "duration" integer NOT NULL, "duration_unit" character varying NOT NULL, "duration_in_days" integer NOT NULL, "auto_create_sprint" boolean NOT NULL DEFAULT false, "start_time" TIMESTAMP, "pause_till" TIMESTAMP, CONSTRAINT "PK_43162b911bbf8ab335ec1be3f23" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sprints" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "deleted_by" integer, "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "status" character varying NOT NULL, "project_id" integer NOT NULL, "start_date" TIMESTAMP NOT NULL, "end_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_6800aa2e0f508561812c4b9afb4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sprint_extensions" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "deleted_by" integer, "deleted_at" TIMESTAMP, "project_id" integer NOT NULL, "duration" integer NOT NULL, "extended_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_a22cd493e47ecef966d06bff1fb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_type" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "deleted_by" integer, "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "project_id" integer, "color_code" character varying, CONSTRAINT "PK_a0669bd34078f33604ec209dab1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "task_priority" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "created_by" integer, "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "uploaded_by" integer, "deleted_by" integer, "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "project_id" integer, "color_code" character varying, "priority" integer, CONSTRAINT "PK_42fc82c4e184b727a3ccd7863ee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_34701b0b8d466af308ba202e4ef" FOREIGN KEY ("parentTaskId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_34701b0b8d466af308ba202e4ef"`);
        await queryRunner.query(`DROP TABLE "task_priority"`);
        await queryRunner.query(`DROP TABLE "task_type"`);
        await queryRunner.query(`DROP TABLE "sprint_extensions"`);
        await queryRunner.query(`DROP TABLE "sprints"`);
        await queryRunner.query(`DROP TABLE "sprint_details"`);
        await queryRunner.query(`DROP TABLE "template_status"`);
        await queryRunner.query(`DROP TABLE "templates"`);
        await queryRunner.query(`DROP TABLE "task_status"`);
        await queryRunner.query(`DROP TABLE "user_tasks"`);
        await queryRunner.query(`DROP TABLE "task_comments"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
    }
}
