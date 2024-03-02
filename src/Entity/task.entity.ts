// task.entity.ts
import { Entity, Column, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from './base';

@Entity('tasks')
export class Task extends BaseEntity {
  @Column({ type: 'varchar', nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'integer', nullable: true, name: 'parent_task_id' })
  parentTaskId: number;

  @Column({ type: 'integer', name: 'status_id' })
  statusId: number;

  @ManyToOne(() => Task, { onDelete: 'CASCADE' })
  parentTask: Task;

  @OneToMany(() => Task, (task) => task.parentTask)
  subTasks: Task[];

  @Column({ name: 'project_id', type: 'integer', nullable: false })
  projectId: number;

  @Column({ default: 'STORY', type: 'varchar', nullable: false })
  type: string;

  @Column({ name: 'assigned_to', type: 'integer', nullable: true })
  assignedTo: number;

  @Column({ type: 'timestamp', nullable: true, name: 'due_date' })
  dueDate: Date;

  @Column({ enum: ['high', 'Medium', 'Low'], default: 'Low' })
  priority: string;

  @Column('varchar', { nullable: true, array: true })
  tags: string[];

  @Column({ type: 'interval', nullable: true })
  estimatedTime: string;

  @Column({ type: 'interval', nullable: true })
  actualTime: string;

  @Column({ type: 'integer', nullable: true, name: 'sprint_id' })
  sprintId: number;
}
