// src/entities/project.entity.ts

import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base';

@Entity('task_type')
export class TaskType extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, name: 'name' })
  name: string;

  @Column({ type: 'integer', nullable: true, name: 'project_id' })
  projectId: number;

  @Column({ type: 'varchar', nullable: true, name: 'color_code' })
  colorCode: string;
}
