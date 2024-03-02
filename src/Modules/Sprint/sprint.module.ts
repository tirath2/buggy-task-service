import { SprintService } from './sprint.service';
import { SprintController } from './sprint.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SprintDetail } from 'src/Entity/sprint-details.entity';
import { SprintDetailService } from './sprint-detail.service';
import { Sprint } from 'src/Entity/sprint.entitiy';
import { SprintScheduleService } from './Scheduler/sprint.schedular';
import { SprintExtension } from 'src/Entity/sprint-extentions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SprintDetail, Sprint, SprintExtension])],
  controllers: [SprintController],
  providers: [SprintService, SprintDetailService, SprintScheduleService],
})
export class SprintModule {}
