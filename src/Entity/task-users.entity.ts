// user-task.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base';

@Entity('user_tasks')
export class UserTask extends BaseEntity {
  @Column({ type: 'integer', name: 'user_id', nullable: false })
  userId: number;

  @Column({ type: 'integer', name: 'task_id', nullable: false })
  taskId: number;
}
