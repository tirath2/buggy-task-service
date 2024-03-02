/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateSprintDetailsDto } from './dto/create-sprint-detail.dto';
import { SprintDetail } from 'src/Entity/sprint-details.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ERROR_MSG } from 'src/Utils/error-msg';
import { SPRINT_DURATION_UNIT } from 'src/enums/sprint-duration-unit.enum';

@Injectable()
export class SprintDetailService {
  constructor(
    @InjectRepository(SprintDetail)
    private readonly sprintDetailRepository: Repository<SprintDetail>,
  ) {}

  async createSprintDetail(createSprintDetailsDto: CreateSprintDetailsDto) {
    try {
      return await this.sprintDetailRepository.save({
        ...createSprintDetailsDto,
        durationInDays: this.getDuration(
          createSprintDetailsDto.duration,
          createSprintDetailsDto.durationUnit,
        ),
      });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }

  getDuration(count: number, type: SPRINT_DURATION_UNIT) {
    if (type === 'DAYS') {
      return count;
    } else if (type === 'WEEK') {
      return count * 7;
    } else {
      return count * 30;
    }
  }

  async getSprintDetails(projectId: number): Promise<SprintDetail> {
    try {
      return await this.sprintDetailRepository.findOne({
        where: { projectId },
      });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }
}
