/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { AddCommentsDto } from './dto/add-comments.dto';
import { TaskComment } from 'src/Entity/task-comments.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ERROR_MSG } from 'src/Utils/error-msg';

@Injectable()
export class TaskCommentsService {
  constructor(
    @InjectRepository(TaskComment)
    private readonly taskCommentsRepository: Repository<TaskComment>,
  ) {}

  async addComments(addCommentsDto: AddCommentsDto, createdBy: number) {
    try {
      return await this.taskCommentsRepository.save({
        ...addCommentsDto,
        createdBy,
      });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }

  async getComments(taskId: number) {
    try {
      const comments = await this.taskCommentsRepository
        .createQueryBuilder('comment')
        .select('comment.comment', 'comment')
        .addSelect('comment.mentioned', 'mentioned')
        .addSelect('comment.replied_to', 'repliedTo')
        .addSelect('comment.task_id', 'taskId')
        .addSelect('comment.created_at', 'createdAt')
        .addSelect('comment.created_by', 'createdBy')
        .addSelect('comment.updated_at', 'updatedAt')
        .addSelect('u.name', 'name')
        .andWhere(`task_id=${taskId}`)
        .leftJoin('users', 'u', 'u.id = comment.createdBy')
        .getRawMany();

      const commentMap = {};
      comments?.map((item) => {
        commentMap[item.id] = item;
      });

      return comments.map((item) => {
        if (item.repliedTo) {
          return {
            ...item,
            parent: commentMap[item.repliedTo],
          };
        } else {
          return item;
        }
      });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }
}
