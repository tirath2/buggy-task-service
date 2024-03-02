import { Injectable, OnModuleInit } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment from 'moment';
import { SprintDetail } from 'src/Entity/sprint-details.entity';
import { Sprint } from 'src/Entity/sprint.entitiy';
import { SPRINT_STATUS } from 'src/enums/sprint-status.enum';
import { In, Repository } from 'typeorm';

@Injectable()
export class SprintScheduleService implements OnModuleInit {
  constructor(
    @InjectRepository(Sprint)
    private readonly sprintRepository: Repository<Sprint>,
    @InjectRepository(SprintDetail)
    private readonly sprintDetailsRepository: Repository<SprintDetail>,
  ) {}
  onModuleInit() {
    this.checkForSprintsThatHasEnded();
  }

  @Cron('0 0 * * *') // Runs at 12 am every day
  handleDailyCron() {
    this.checkForSprintsThatHasEnded();
  }

  async endSprint(sprints: Sprint[]) {
    await this.sprintRepository
      .createQueryBuilder()
      .update()
      .set({ status: SPRINT_STATUS.COMPLETED })
      .where(`id IN (${sprints?.map((sprint) => sprint.id)})`)
      .execute();
  }

  async startSprint(sprints: Sprint[]) {
    await this.sprintRepository
      .createQueryBuilder()
      .update()
      .set({ status: SPRINT_STATUS.ONGOING })
      .where(`id IN (${sprints?.map((sprint) => sprint.id)})`)
      .execute();

    const updatedSprint = await this.sprintRepository.findByIds(
      sprints.map((sprint) => sprint.id),
    );

    this.addUpcomingSprint(updatedSprint);
  }

  async addUpcomingSprint(sprints: Sprint[]) {
    const sprintDetails = await this.sprintDetailsRepository.find({
      where: {
        projectId: In(sprints?.map((sprint) => sprint.id)),
      },
    });
    //map for [key : projectId]=ongoing sprints
    const sprintProjectMap: { [key: number]: Sprint } = {};
    sprints?.map((item) => {
      sprintProjectMap[item.projectId] = item;
    });

    const sprintsToAdd: Sprint[] = [];
    sprintDetails?.map((item) => {
      const sprint = new Sprint();
      const onGoingSprint = sprintProjectMap[item.projectId];
      sprint.name =
        'Sprint-' + (parseInt(onGoingSprint?.name?.split('-')?.[1] || '0') + 1);
      sprint.status = SPRINT_STATUS.UPCOMING;
      sprint.startDate = moment(onGoingSprint.endDate).add(1, 'day')?.toDate();
      sprint.endDate = moment(onGoingSprint.endDate)
        .add(item.duration + 1, 'day')
        ?.toDate();
      sprint.projectId = item.projectId;

      sprintsToAdd.push(sprint);
    });

    await this.sprintRepository.save(sprintsToAdd);
  }

  async moveSprintsToOngoing() {
    const query = this.sprintRepository
      .createQueryBuilder('sprint')
      .leftJoinAndSelect(
        'sprint_details',
        'sd',
        'sprint.projectId = sd.projectId',
      )
      .where('DATE(sprint.start_date) = DATE(:today)', { today: new Date() })
      .andWhere('sprint.status <> :status', { status: SPRINT_STATUS.UPCOMING })
      .andWhere('(sd.auto_create_sprint=true)');
    const sprints = await query.getMany();

    if (sprints?.length) {
      this.startSprint(sprints);
    }
  }

  async checkIfNeedToStartANewSprint() {
    const sprintDetails = await this.sprintDetailsRepository
      .createQueryBuilder('sprintDetail')
      .leftJoin(
        Sprint,
        'sprint',
        'sprintDetail.projectId = sprint.projectId AND DATE(sprint.startDate) <= DATE(:today)',
        { today: new Date() },
      )
      .where('sprint.id IS NULL')
      .andWhere('DATE(sprintDetail.startTime) <= DATE(:today)', {
        today: new Date(),
      })
      .andWhere('sprintDetail.auto_create_sprint=true')
      .getMany();

    console.log(sprintDetails);
    if (sprintDetails?.length) {
      this.createInitialSprints(sprintDetails);
    }
  }

  async createInitialSprints(sprintDetails: SprintDetail[]) {
    const sprintsToAdd: Sprint[] = [];
    sprintDetails?.map((item) => {
      console.log(item.startTime);
      const sprint1 = new Sprint();
      sprint1.name = 'Sprint-' + 1;
      sprint1.status = SPRINT_STATUS.ONGOING;
      sprint1.startDate = moment(item.startTime)?.toDate();
      sprint1.endDate = moment(item.startTime)
        .add(item.duration, 'day')
        ?.toDate();
      sprint1.projectId = item.projectId;
      const sprint2 = new Sprint();
      sprint2.name = 'Sprint-' + 2;
      sprint2.status = SPRINT_STATUS.ONGOING;
      sprint2.startDate = moment(sprint1.endDate)?.add(1, 'day')?.toDate();
      sprint2.endDate = moment(sprint1.endDate)
        .add(item.duration + 1, 'day')
        ?.toDate();
      sprint2.projectId = item.projectId;

      sprintsToAdd.push(sprint1);
      sprintsToAdd.push(sprint2);
    });

    console.log(sprintsToAdd);
    await this.sprintRepository.save(sprintsToAdd);
  }

  async checkForSprintsThatHasEnded() {
    const query = this.sprintRepository
      .createQueryBuilder('sprint')
      .leftJoinAndSelect(
        'sprint_extensions',
        'extension',
        'sprint.id = extension.sprintId',
      )
      .where('DATE(sprint.end_date) < DATE( :today)', { today: new Date() })
      .andWhere('sprint.status <> :status', { status: SPRINT_STATUS.COMPLETED })
      .andWhere(
        '(DATE(extension.extended_date) < DATE( :today) OR extension.extended_date IS NULL)',
        { today: new Date() },
      );

    const sprints = await query.getMany();

    if (sprints.length) {
      await this.endSprint(sprints);
    }
    await this.moveSprintsToOngoing();
    await this.checkIfNeedToStartANewSprint();
  }
}
