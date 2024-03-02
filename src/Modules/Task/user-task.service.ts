import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserTask } from 'src/Entity/task-users.entity';
import { ERROR_MSG } from 'src/Utils/error-msg';
import { QueryRunner, Repository } from 'typeorm';

@Injectable()
export class UserTaskService {
  constructor(
    @InjectRepository(UserTask)
    private readonly taskRepository: Repository<UserTask>,
  ) {}

  async assign(userId, taskId, queryRunner: QueryRunner) {
    try {
      let userTaskRepo = this.taskRepository;
      if (queryRunner) {
        userTaskRepo = queryRunner.manager.getRepository(UserTask);
      }
      const newAssign = new UserTask();
      newAssign.taskId = taskId;
      newAssign.userId = userId;
      await userTaskRepo.save(newAssign);
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }
}
