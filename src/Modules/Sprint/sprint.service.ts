/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sprint } from 'src/Entity/sprint.entitiy';
import { SPRINT_STATUS } from 'src/enums/sprint-status.enum';
import { Repository } from 'typeorm';
import { CreateSprintDto } from './dto/create-sprint.dto';
import { ERROR_MSG } from 'src/Utils/error-msg';
import { SPRINT_PREFIX } from '../Auth/constant';

@Injectable()
export class SprintService {
  constructor(
    @InjectRepository(Sprint)
    private readonly sprintRepository: Repository<Sprint>,
  ) {}

  async getSprint(
    projectId: number,
    running = false,
  ): Promise<Sprint | Sprint[]> {
    try {
      if (running) {
        return await this.sprintRepository.findOne({
          where: { projectId, status: SPRINT_STATUS.ONGOING },
          order: { id: 'DESC' },
        });
      }

      return await this.sprintRepository.find({
        where: { projectId },
        order: { id: 'DESC' },
      });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }

  async createSprint(createSprintDto: CreateSprintDto) {
    try {
      const newSprintName = await this.getNewSprintName(
        createSprintDto.projectId,
      );
      return await this.sprintRepository.save({
        ...createSprintDto,
        name: SPRINT_PREFIX + newSprintName,
        status: SPRINT_STATUS.UPCOMING,
      });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }

  async getNewSprintName(projectId) {
    try {
      const lastSprint = await this.getSprint(projectId);
      if (lastSprint && Array.isArray(lastSprint) && lastSprint?.length) {
        return parseInt(lastSprint[0].name?.split('-')[1]) + 1;
      } else {
        return 1;
      }
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }
}
