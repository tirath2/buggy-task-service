// task-comment.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base';

@Entity('sprint_extensions')
export class SprintExtension extends BaseEntity {
  @Column({ type: 'integer', name: 'project_id', nullable: false })
  projectId: number;

  @Column({ type: 'integer', name: 'duration', nullable: false })
  sprintId: number;

  @Column({ type: 'timestamp', name: 'extended_date', nullable: false })
  extendedDate: string;
}
