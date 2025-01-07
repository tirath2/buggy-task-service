import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddStatusDto } from './dto/add-task-status.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, In, Repository } from 'typeorm';
import { TaskStatus } from 'src/Entity/task-status.entity';
import { ERROR_MSG } from 'src/Utils/error-msg';
import { AddStatusAndTypeDto } from 'src/Modules/TaskStatus/dto/add-task-status-and-type.dto';
import { TaskTypeService } from '../TaskType/task-type.service';
import { TaskPriorityService } from '../TaskPriority/task-priority.service';
import { TASK_STATUS_DEFAULT_COLOR } from '../Auth/constant';

@Injectable()
export class TaskStatusService {
  constructor(
    @InjectRepository(TaskStatus)
    private readonly statusModel: Repository<TaskStatus>,
    private readonly dataSource: DataSource,
    private readonly taskTypeService: TaskTypeService,
    private readonly taskPriorityService: TaskPriorityService,
  ) {}

  getColorCodeForStatus(statusName) {
    const foundStatus = TASK_STATUS_DEFAULT_COLOR.find(
      (status) =>
        status.name?.toLocaleLowerCase()?.trim() ===
        statusName?.toLocaleLowerCase()?.trim(),
    );
    if (foundStatus) {
      return foundStatus.colorCode;
    } else {
      const randomColorCode =
        '#' + Math.floor(Math.random() * 16777215).toString(16);
      return randomColorCode;
    }
  }

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
        statusToSave?.map((item) => {
          item.colorCode = this.getColorCodeForStatus(item.name);
        });

        const newStatus = await this.statusModel.save(statusToSave);
        return [...existing, ...newStatus];
      } else {
        return [...existing];
      }
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }

  async addStatusAndType(statusAndTypeDto: AddStatusAndTypeDto) {
    const queryRunner = this.dataSource.createQueryRunner();
    queryRunner.connect();
    queryRunner.startTransaction();
    try {
      const statusRepo = queryRunner.manager.getRepository(TaskStatus);
      const statusNames = statusAndTypeDto.status?.map((item) => item.name);
      const existing = await statusRepo.find({
        where: {
          name: In(statusNames),
          projectId: statusAndTypeDto.projectId,
        },
      });

      const existingStatus = existing?.map((item) => item.name);

      const statusToSave: {
        projectId: number;
        name: string;
        colorCode: string;
      }[] = [];
      statusAndTypeDto.status?.map((item) => {
        if (!existingStatus.includes(item.name)) {
          statusToSave.push({
            projectId: statusAndTypeDto.projectId,
            name: item.name,
            colorCode: this.getColorCodeForStatus(item.name),
          });
        }
      });

      await this.taskPriorityService.addDefaultPriority(
        statusAndTypeDto.projectId,
        queryRunner,
      );

      const taskType = await this.taskTypeService.bulkUpload(
        statusAndTypeDto.type,
        statusAndTypeDto.projectId,
        queryRunner,
      );

      if (statusToSave?.length) {
        const newStatus = await statusRepo.save(statusToSave);
        await queryRunner.commitTransaction();
        return { status: [...existing, ...newStatus], taskType: taskType };
      } else {
        await queryRunner.commitTransaction();
        return { status: [...existing], taskType: taskType };
      }
    } catch (error) {
      console.log(error);
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    } finally {
      if (!queryRunner.isReleased) queryRunner.release();
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
