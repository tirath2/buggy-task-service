import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddStatusDto } from './dto/add-task-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { TaskStatus } from 'src/Entity/task-status.entity';
import { ERROR_MSG } from 'src/Utils/error-msg';

@Injectable()
export class TaskStatusService {
  constructor(
    @InjectRepository(TaskStatus)
    private readonly statusModel: Repository<TaskStatus>,
  ) {}

  async addStatus(statusDto: AddStatusDto[]) {
    try {
      const existing = await this.statusModel.find({
        where: {
          name: In(statusDto?.map((item) => item.name)),
          projectId: statusDto[0]?.projectId,
        },
      });

      const existingStatus = existing?.map((item) => item.name);

      const statusToSave = statusDto?.filter(
        (item) => !existingStatus.includes(item.name),
      );

      if (statusToSave?.length) {
        const newStatus = this.statusModel.save(statusToSave);
        return [...existing, newStatus];
      } else {
        return [...existing];
      }
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }

  async fetchStatuses(projectId: number) {
    try {
      return this.statusModel.find({
        where: { projectId },
      });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }

  async deleteStatus(id: number) {
    try {
      return this.statusModel.delete(id);
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }
}
