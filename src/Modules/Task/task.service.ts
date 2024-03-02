// task.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from 'src/Entity/task.entity';
import { UserTaskService } from './user-task.service';
import { RequestService } from 'src/Utils/request.service';
import { TemplateService } from '../Template/template.service';
import { UpdateProjectDto } from './dto/update-project.dto';
import { AddToSprintDto } from './dto/add-to-sprint.dto';
import { ERROR_MSG } from 'src/Utils/error-msg';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    private readonly userTaskService: UserTaskService,
    private readonly requestService: RequestService,
    private readonly templateService: TemplateService,
    private readonly dataSource: DataSource,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const {
        title,
        description,
        parentId,
        type,
        assignedTo,
        apiLogs,
        projectId,
        dueDate,
        priority,
        statusId,
        tags,
      } = createTaskDto;

      // Create a new task
      const newTask = new Task();
      newTask.title = title;
      newTask.description = description;
      newTask.parentTaskId = parentId;
      newTask.type = type;
      newTask.projectId = projectId;
      newTask.dueDate = dueDate;
      newTask.priority = priority;
      newTask.statusId = statusId;
      newTask.tags = tags;
      newTask.assignedTo = assignedTo;

      const taskRepo = queryRunner.manager.getRepository(Task);

      const task = await taskRepo.save(newTask);
      if (assignedTo)
        await this.userTaskService.assign(task.id, assignedTo, queryRunner);
      if (apiLogs) {
        const logs = apiLogs.map((item) => {
          return { ...item, projectId: projectId, taskId: task.id };
        });
        await this.requestService.saveLogs(logs);
      }
      await queryRunner.commitTransaction();
      return task;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    } finally {
      if (!queryRunner?.isReleased) {
        await queryRunner.release();
      }
    }
  }

  async getTaskByStatus(id: number, sprintId: number) {
    try {
      const task = await await this.taskRepository
        .createQueryBuilder('t')
        .select('t.title', 'title')
        .addSelect('t.description', 'description')
        .addSelect('t.status_id', 'statusId')
        .addSelect('s.name', 'statusName')
        .addSelect('t.priority', 'priority')
        .addSelect('u.name', 'assignedToName')
        .addSelect('t.type', 'type')
        .addSelect('t.assigned_to', 'assignedTo')
        .addSelect('t.tags', 'tags')
        .addSelect('t.id', 'id')
        .leftJoin('users', 'u', '"u".id = t.assignedTo')
        .leftJoin('task_status', 's', '"t".status_id = s.id')
        .where(
          `t.project_id=${id}  ${
            sprintId ? ' and t.sprint_id=' + sprintId : ''
          } `,
        )
        .getRawMany();

      const template = await this.templateService.get(id);

      if (!template) {
        return [];
      }
      const taskMap = {};
      task.map((item) => {
        if (taskMap[item.statusId]) {
          taskMap[item.statusId].push(item);
        } else {
          taskMap[item.statusId] = [item];
        }
      });
      console.log({ taskMap });
      const result = [];
      console.log(template.status);
      template.status.map((item) => {
        result.push({ ...item, task: taskMap[item.taskStatusId] });
      });

      return result;
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }

  async updateTaskStatus(taskId: number, statusId: number) {
    try {
      const task = await this.taskRepository.findOne({ where: { id: taskId } });
      task.statusId = statusId;
      return this.taskRepository.save(task);
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }

  async updateTaskTag(taskId: number, tag: string) {
    try {
      const task = await this.taskRepository.findOne({ where: { id: taskId } });
      if (task.tags) {
        task.tags?.push(tag);
      } else {
        task.tags = [tag];
      }
      return this.taskRepository.save(task);
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }

  async update(updateProject: UpdateProjectDto) {
    try {
      const task = await this.taskRepository.findOne({
        where: { id: updateProject.id },
      });
      return this.taskRepository.save({ ...task, ...updateProject });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }

  taskQuery() {
    try {
      return this.taskRepository
        .createQueryBuilder('t')
        .select('t.title', 'title')
        .addSelect('t.description', 'description')
        .addSelect('t.status_id', 'statusId')
        .addSelect('t.priority', 'priority')
        .addSelect('p.name', 'projectName')
        .addSelect('p.id', 'projectId')
        .addSelect('s.name', 'statusName')
        .addSelect('t.id', 'id')
        .leftJoin('projects', 'p', '"p".id = t.project_id')
        .leftJoin('task_status', 's', '"t".status_id = s.id');
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }

  async getTaskForUser(id: number) {
    try {
      return await this.taskQuery().where(`t.assignedTo=${id}`).getRawMany();
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }

  async fetchProjectBackLogs(projectId: number) {
    try {
      return await this.taskQuery()
        .where(`t.sprint_id IS NULL`)
        .andWhere(`t.project_id=${projectId}`)
        .getRawMany();
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }

  async getTaskDetail(id: number) {
    try {
      return await await this.taskRepository
        .createQueryBuilder('t')
        .select('t.title', 'title')
        .addSelect('t.description', 'description')
        .addSelect('t.status_id', 'statusId')
        .addSelect('s.name', 'statusName')
        .addSelect('t.priority', 'priority')
        .addSelect('u.name', 'assignedToName')
        .addSelect('t.type', 'type')
        .addSelect('t.assigned_to', 'assignedTo')
        .addSelect('t.tags', 'tags')
        .addSelect('t.id', 'id')
        .leftJoin('users', 'u', '"u".id = t.assignedTo')
        .leftJoin('task_status', 's', '"s".id = t.status_id')

        .where(`t.id=${id}`)
        .getRawOne();
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }

  async addTaskToSprint(addTaskToSprint: AddToSprintDto) {
    try {
      return await this.taskRepository.update(addTaskToSprint.taskIds, {
        sprintId: addTaskToSprint.sprintId,
      });
    } catch (error) {
      throw new InternalServerErrorException(ERROR_MSG.SOMETHING_WENT_WRONG);
    }
  }
}
