import { TaskPriorityService } from './task-priority.service';
import { TaskPriorityController } from './task-priority.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskPriority } from 'src/Entity/task-priority.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TaskPriority])],
  controllers: [TaskPriorityController],
  providers: [TaskPriorityService],
})
export class TaskPriorityModule {}
