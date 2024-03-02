// task-comment.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base';

@Entity('sprint_details')
export class SprintDetail extends BaseEntity {
  @Column({ type: 'integer', name: 'project_id', nullable: false })
  projectId: number;

  @Column({ type: 'integer', name: 'duration', nullable: false })
  duration: number;

  @Column({ type: 'varchar', name: 'duration_unit', nullable: false })
  durationUnit: string;

  @Column({ type: 'integer', name: 'duration_in_days', nullable: false })
  durationInDays: number;

  @Column({
    type: 'boolean',
    name: 'auto_create_sprint',
    nullable: false,
    default: false,
  })
  autoCreateSprint: boolean;

  @Column({
    type: 'timestamp',
    name: 'start_time',
    nullable: true,
  })
  startTime: string;

  @Column({
    type: 'timestamp',
    name: 'pause_till',
    nullable: true,
  })
  pauseTill: string;
}
