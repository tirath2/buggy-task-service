// task-comment.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base';

@Entity('task_comments')
export class TaskComment extends BaseEntity {
  @Column({ type: 'integer', name: 'task_id', nullable: false })
  taskId: number;
  @Column({ type: 'text', nullable: false })
  comment: string;

  @Column({ type: 'integer', nullable: true, array: true })
  mentioned: number[];

  @Column({ type: 'integer', nullable: true, name: 'replied_to' })
  repliedTo: number;
}
