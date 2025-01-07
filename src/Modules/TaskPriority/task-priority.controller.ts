/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskPriorityService } from './task-priority.service';
import { TaskPriority } from 'src/Entity/task-priority.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('task-priority')
@ApiTags('task-priority')
export class TaskPriorityController {
  constructor(private readonly taskPriorityService: TaskPriorityService) {}

  @Post()
  create(
    @Body() taskPriorityData: Partial<TaskPriority>,
  ): Promise<TaskPriority> {
    return this.taskPriorityService.create(taskPriorityData);
  }

  @Post('bulk')
  bulkCreate(
    @Body() taskPrioritiesData: Partial<TaskPriority>[],
  ): Promise<TaskPriority[]> {
    return this.taskPriorityService.bulkCreate(taskPrioritiesData);
  }

  @Get()
  findAll(): Promise<TaskPriority[]> {
    return this.taskPriorityService.findAll();
  }

  @Get(':id')
  findById(@Param('id') id: string): Promise<TaskPriority> {
    return this.taskPriorityService.findById(+id);
  }
  @Get('byProject/:id')
  findByProjectId(@Param('id') id: string): Promise<TaskPriority[]> {
    return this.taskPriorityService.findByProjectId(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() taskPriorityData: Partial<TaskPriority>,
  ): Promise<TaskPriority> {
    return this.taskPriorityService.update(+id, taskPriorityData);
  }

  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.taskPriorityService.delete(+id);
  }
}
