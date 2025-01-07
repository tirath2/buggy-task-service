import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskType } from 'src/Entity/task.type.entity';
import { In, QueryRunner, Repository } from 'typeorm';
import { TASK_TYPE_DEFAULT_COLOR } from '../Auth/constant';

@Injectable()
export class TaskTypeService {
  constructor(
    @InjectRepository(TaskType)
    private readonly taskTypeRepository: Repository<TaskType>,
  ) {}

  getColorCodeForType(name) {
    const foundType = TASK_TYPE_DEFAULT_COLOR.find(
      (type) =>
        type.name?.toLocaleLowerCase()?.trim() ===
        name?.toLocaleLowerCase()?.trim(),
    );
    if (foundType) {
      return foundType.colorCode;
    } else {
      const randomColorCode =
        '#' + Math.floor(Math.random() * 16777215).toString(16);
      return randomColorCode;
    }
  }

  async bulkUpload(
    taskType: { name: string }[],
    projectId: number,
    queryRunner?: QueryRunner,
  ) {
    let taskRepo = this.taskTypeRepository;
    if (queryRunner) {
      taskRepo = queryRunner.manager.getRepository(TaskType);
    }

    const names = taskType?.map((item) => item.name);

    const existing = await taskRepo.find({
      where: {
        name: In(names),
        projectId: projectId,
      },
    });

    const existingTaskType = existing?.map((item) => item.name);

    const taskTypeToSave: {
      projectId: number;
      name: string;
      colorCode: string;
    }[] = [];
    taskType?.map((item) => {
      if (!existingTaskType.includes(item.name)) {
        taskTypeToSave.push({
          projectId: projectId,
          name: item.name,
          colorCode: this.getColorCodeForType(item.name),
        });
      }
    });

    if (taskTypeToSave?.length) {
      const newStatus = await taskRepo.save(taskTypeToSave);
      return [...existing, newStatus];
    } else {
      return [...existing];
    }
  }

  async getTaskType(projectId: number) {
    return await this.taskTypeRepository.find({ where: { projectId } });
  }

  async delete(id: number) {
    return await this.taskTypeRepository.delete(id);
  }
}
