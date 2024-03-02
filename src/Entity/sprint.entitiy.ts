// task.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base';
import { SPRINT_STATUS } from 'src/enums/sprint-status.enum';

@Entity('sprints')
export class Sprint extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ enum: SPRINT_STATUS, name: 'status' })
  status: SPRINT_STATUS;

  @Column({ name: 'project_id', type: 'integer', nullable: false })
  projectId: number;

  @Column({ type: 'timestamp', nullable: false, name: 'start_date' })
  startDate: Date;

  @Column({ type: 'timestamp', nullable: false, name: 'end_date' })
  endDate: Date;
}
