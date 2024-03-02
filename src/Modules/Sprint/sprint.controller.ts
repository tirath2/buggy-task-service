/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSprintDetailsDto } from './dto/create-sprint-detail.dto';
import { SprintDetailService } from './sprint-detail.service';
import { SprintDetail } from 'src/Entity/sprint-details.entity';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { Sprint } from 'src/Entity/sprint.entitiy';
import { SprintService } from './sprint.service';

@Controller('sprint')
@ApiTags('sprint')
export class SprintController {
  constructor(
    private readonly sprintDetailService: SprintDetailService,
    private readonly sprintService: SprintService,
  ) {}

  @Post('')
  async createSprint(
    @Body() createSprintDto: CreateSprintDto,
  ): Promise<Sprint> {
    return await this.sprintService.createSprint(createSprintDto);
  }

  @Get('')
  async getCurrentSprint(
    @Query('projectId', ParseIntPipe) projectId: number,
  ): Promise<Sprint | Sprint[]> {
    return await this.sprintService.getSprint(projectId, true);
  }

  @Get('all')
  async getAllSprint(
    @Query('projectId', ParseIntPipe) projectId: number,
  ): Promise<Sprint | Sprint[]> {
    return await this.sprintService.getSprint(projectId);
  }

  @Get('sprint-detail')
  async getSprintDetail(
    @Query('projectId', ParseIntPipe) projectId: number,
  ): Promise<SprintDetail> {
    return await this.sprintDetailService.getSprintDetails(projectId);
  }

  @Post('sprint-detail')
  async createSprintDetail(
    @Body() createSprintDetailsDto: CreateSprintDetailsDto,
  ): Promise<SprintDetail> {
    return await this.sprintDetailService.createSprintDetail(
      createSprintDetailsDto,
    );
  }
}
