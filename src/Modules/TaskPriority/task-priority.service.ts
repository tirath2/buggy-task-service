import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TaskPriority } from 'src/Entity/task-priority.entity';
import { QueryRunner, Repository } from 'typeorm';
import { DEFAULT_PRIORITY } from '../Auth/constant';

@Injectable()
export class TaskPriorityService {
  constructor(
    @InjectRepository(TaskPriority)
    private readonly taskPriorityRepository: Repository<TaskPriority>,
  ) {}

  async create(taskPriorityData: Partial<TaskPriority>): Promise<TaskPriority> {
    const taskPriority = this.taskPriorityRepository.create(taskPriorityData);
    return await this.taskPriorityRepository.save(taskPriority);
  }

  async bulkCreate(
    taskPrioritiesData: Partial<TaskPriority>[],
  ): Promise<TaskPriority[]> {
    const taskPriorities =
      this.taskPriorityRepository.create(taskPrioritiesData);
    return await this.taskPriorityRepository.save(taskPriorities);
  }

  async findAll(): Promise<TaskPriority[]> {
    return await this.taskPriorityRepository.find();
  }

  async findById(id: number): Promise<TaskPriority> {
    return await this.taskPriorityRepository.findOne({ where: { id } });
  }

  async findByProjectId(projectId: number): Promise<TaskPriority[]> {
    return await this.taskPriorityRepository.find({
      where: { projectId },
    });
  }

  async update(
    id: number,
    taskPriorityData: Partial<TaskPriority>,
  ): Promise<any> {
    return await this.taskPriorityRepository.update(id, taskPriorityData);
  }

  async delete(id: number): Promise<void> {
    await this.taskPriorityRepository.delete(id);
  }

  async addDefaultPriority(projectId: number, queryRunner: QueryRunner) {
    const existing = await this.findByProjectId(projectId);

    console.log({ existing });
    if (existing?.length) {
      return existing;
    } else {
      let priorityRepo = queryRunner.manager.getRepository(TaskPriority);
      const defaultPriority = DEFAULT_PRIORITY;
      const taskPriority = priorityRepo.create(
        defaultPriority.map((item) => ({ ...item, projectId })),
      );
      return await priorityRepo.save(taskPriority);
    }
  }
}
