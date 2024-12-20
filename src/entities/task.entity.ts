import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./user.entity";

export enum StatusEnum {
  'pending' = 'PENDING',
  'done' = 'DONE',
  'edited' = 'EDITED',
  'arquived' = 'ARQUIVED'
}

@Entity('Tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid', { name: 'tast_id' })
  id: string;

  @Column({ name: 'title', type: 'varchar', length: '40', unique: true, })
  title: string;

  @Column({ name: 'content', type: 'text', nullable: true })
  content?: string;

  @Column({ name: 'status', type: 'enum', enum: StatusEnum,  default: StatusEnum.pending })
  status: StatusEnum;

  @Column({ name: 'done', type: 'boolean',  default: false })
  done: boolean;
  

  @ManyToOne(() => User, (task) => task.tasks)
  user: User;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
  updatedAt: Date;
}