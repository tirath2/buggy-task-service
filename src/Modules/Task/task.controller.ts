import {
  Controller,
  Post,
  Body,
  UseGuards,
  Request,
  Get,
  Param,
  ParseIntPipe,
  Query,
  Patch,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from 'src/Entity/task.entity';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddToSprintDto } from './dto/add-to-sprint.dto';
import { AddCommentsDto } from './dto/add-comments.dto';
import { TaskCommentsService } from './task-comments.service';

@Controller('tasks')
@UseGuards(AuthGuard('jwt'))
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly taskCommentsService: TaskCommentsService,
  ) {}

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return await this.taskService.createTask(createTaskDto);
  }

  @Get('task-by-status/:id')
  async fetchStatuses(
    @Param('id', ParseIntPipe) id: number,
    @Query('sprintId') sprintId: number,
  ) {
    return this.taskService.getTaskByStatus(id, sprintId);
  }
  @Get('user-task')
  async fetchUserTask(@Request() req) {
    return this.taskService.getTaskForUser(req.user.id);
  }

  @Get('project-backlogs')
  async fetchProjectBackLogs(
    @Query('projectId', ParseIntPipe) projectId: number,
  ) {
    return this.taskService.fetchProjectBackLogs(projectId);
  }

  @Get()
  async fetchTask(@Query('taskId', ParseIntPipe) taskId: number) {
    return this.taskService.getTaskDetail(taskId);
  }

  @Get('update-status')
  async updateStatus(
    @Query('taskId', ParseIntPipe) taskId: number,
    @Query('statusId', ParseIntPipe) statusId: number,
  ) {
    return this.taskService.updateTaskStatus(taskId, statusId);
  }

  @Patch('update-tags')
  async updateTags(
    @Query('taskId', ParseIntPipe) taskId: number,
    @Query('tag') tag: string,
  ) {
    return this.taskService.updateTaskTag(taskId, tag);
  }

  @Post('update')
  async update(@Body() updateProject: UpdateProjectDto) {
    return this.taskService.update(updateProject);
  }

  @Post('add/to/sprint')
  async addToSprint(@Body() addTaskToSprint: AddToSprintDto) {
    return this.taskService.addTaskToSprint(addTaskToSprint);
  }

  @Post('/comments')
  async addToComments(@Body() addCommentsDto: AddCommentsDto, @Request() req) {
    return this.taskCommentsService.addComments(addCommentsDto, req.user.id);
  }

  @Get('comments')
  async getComments(@Query('taskId', ParseIntPipe) taskId: number) {
    return this.taskCommentsService.getComments(taskId);
  }
}
