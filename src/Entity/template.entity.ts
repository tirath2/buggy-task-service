// src/entities/project.entity.ts

import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base';

@Entity('templates')
export class Template extends BaseEntity {
  @Column({ type: 'varchar', nullable: false, name: 'name' })
  name: string;

  @Column({ type: 'integer', nullable: true, name: 'project_id' })
  projectId: number;
}
