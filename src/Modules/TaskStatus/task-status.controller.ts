import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  ParseIntPipe,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { TaskStatusService } from './task-status.service';
import { AddStatusDto } from './dto/add-task-status.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('status')
@UseGuards(AuthGuard('jwt'))
@ApiTags('task_status')
export class TaskStatusController {
  constructor(private readonly statusService: TaskStatusService) {}

  @Post('add')
  @ApiBody({ type: [AddStatusDto] })
  async addStatus(@Body() statusDto: AddStatusDto[]) {
    return this.statusService.addStatus(statusDto);
  }

  @Get('fetch/:projectId')
  async fetchStatuses(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.statusService.fetchStatuses(projectId);
  }

  @Delete('delete/:projectId')
  async deleteStatus(@Param('projectId', ParseIntPipe) projectId: number) {
    return this.statusService.deleteStatus(projectId);
  }
}
