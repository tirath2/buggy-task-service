import { Controller, Delete, Get, ParseIntPipe, Query } from '@nestjs/common';
import { TaskTypeService } from './task-type.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('task-type')
@ApiTags('task-type')
export class TaskTypeController {
  constructor(private readonly taskTypeService: TaskTypeService) {}

  @Get()
  async getTaskType(@Query('projectId', ParseIntPipe) projectId: number) {
    return await this.taskTypeService.getTaskType(projectId);
  }

  @Delete()
  async deleteTaskType(@Query('id', ParseIntPipe) id: number) {
    return this.taskTypeService.delete(id);
  }
}
