// src/entities/project.entity.ts

import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base';

@Entity('template_status')
export class TemplateStatus extends BaseEntity {
  @Column({ type: 'integer', nullable: false, name: 'template_id' })
  templateId: number;

  @Column({ type: 'integer', nullable: false, name: 'task_status_id' })
  taskStatusId: number;

  @Column({ type: 'varchar', nullable: false, name: 'task_status_name' })
  taskStatusName: string;

  @Column({ type: 'integer', nullable: true, name: 'sequence' })
  sequence: number;

  @Column({ type: 'json', nullable: false, name: 'next' })
  next: number[];

  @Column({ type: 'json', nullable: false, name: 'role_that_can_override' })
  roleThatCanOverRide: number[];

  @Column({ type: 'boolean', nullable: false, name: 'is_end' })
  isEnd: boolean;
}
