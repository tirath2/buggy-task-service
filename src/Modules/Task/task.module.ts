import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Module } from '@nestjs/common';
import { TaskCommentsService } from './task-comments.service';
import { UserTaskService } from './user-task.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from 'src/Entity/task.entity';
import { TaskComment } from 'src/Entity/task-comments.entity';
import { UserTask } from 'src/Entity/task-users.entity';
import { RequestService } from 'src/Utils/request.service';
import { TemplateService } from '../Template/template.service';
import { Template } from 'src/Entity/template.entity';
import { TaskStatus } from 'src/Entity/task-status.entity';
import { TemplateStatusService } from '../Template/template-status.service';
import { TemplateStatus } from 'src/Entity/template-status';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Task,
      TaskComment,
      UserTask,
      Template,
      TaskStatus,
      TemplateStatus,
    ]),
  ],
  controllers: [TaskController],
  providers: [
    TaskService,
    TaskCommentsService,
    UserTaskService,
    RequestService,
    TemplateService,
    TemplateStatusService,
  ],
})
export class TaskModule {}
