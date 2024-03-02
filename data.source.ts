import { Task } from 'src/Entity/task.entity';
import { TaskComment } from 'src/Entity/task-comments.entity';
import { UserTask } from 'src/Entity/task-users.entity';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TaskStatus } from 'src/Entity/task-status.entity';
import { Template } from 'src/Entity/template.entity';
import { TemplateStatus } from 'src/Entity/template-status';
import { SprintDetail } from 'src/Entity/sprint-details.entity';
import { Sprint } from 'src/Entity/sprint.entitiy';
import { SprintExtension } from 'src/Entity/sprint-extentions.entity';
export const dbdatasource: DataSourceOptions = {
  migrationsTableName: 'task_migrations',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'groyyo123',
  database: 'buggy',
  logging: true,
  synchronize: false,
  name: 'default',
  entities: [
    Task,
    TaskComment,
    UserTask,
    TaskStatus,
    Template,
    TemplateStatus,
    SprintDetail,
    Sprint,
    SprintExtension,
  ],
  migrations: ['src/migrations/**/*{.ts,.js}'],
  subscribers: ['src/subscriber/**/*{.ts,.js}'],
};

const dataSource = new DataSource(dbdatasource);
export default dataSource;
