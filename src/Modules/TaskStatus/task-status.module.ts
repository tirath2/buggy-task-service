import { TaskStatusService } from './task-status.service';
import { TaskStatusController } from './task-status.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskStatus } from 'src/Entity/task-status.entity';
import { Template } from 'src/Entity/template.entity';
import { TemplateStatus } from 'src/Entity/template-status';
import { TaskType } from 'src/Entity/task.type.entity';
import { TaskTypeService } from '../TaskType/task-type.service';
import { TaskPriority } from 'src/Entity/task-priority.entity';
import { TaskPriorityService } from '../TaskPriority/task-priority.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TaskStatus,
      Template,
      TemplateStatus,
      TaskType,
      TaskPriority,
    ]),
  ],
  controllers: [TaskStatusController],
  providers: [TaskStatusService, TaskTypeService, TaskPriorityService],
})
export class StatusModule {}
