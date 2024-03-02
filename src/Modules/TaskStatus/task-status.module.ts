import { TaskStatusService } from './task-status.service';
import { TaskStatusController } from './task-status.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskStatus } from 'src/Entity/task-status.entity';
import { Template } from 'src/Entity/template.entity';
import { TemplateStatus } from 'src/Entity/template-status';

@Module({
  imports: [TypeOrmModule.forFeature([TaskStatus, Template, TemplateStatus])],
  controllers: [TaskStatusController],
  providers: [TaskStatusService],
})
export class StatusModule {}
