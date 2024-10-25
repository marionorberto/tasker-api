import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";
import { Task } from "./task.entity";

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column({ name: 'username', type: 'varchar', length: '40', unique: true })
  username: string;

  @Column({ name: 'password_hash', type: 'text'})
  password: string;
  
  @OneToMany(()=>Task, (task)=> task.user, { cascade: true } )
  tasks: Task[]

  @CreateDateColumn({ name: 'created_at', type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
  updatedAt: Date;
}