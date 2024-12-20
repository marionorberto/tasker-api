import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from "typeorm";
import { Task } from "./task.entity";

import bcryptjs from 'bcryptjs';

@Entity('Users')
export class User {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column({ name: 'email', type: 'varchar', length: '40', unique: true })
  email: string;

  @Column({ name: 'password_hash', type: 'text'})
  password: string;
  
  @OneToMany(()=>Task, (task)=> task.user, { cascade: true } )
  tasks: Task[]

  @CreateDateColumn({ name: 'created_at', type: 'timestamp'})
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp'})
  updatedAt: Date;

  @BeforeUpdate()
  @BeforeInsert()
  async hashPassword() {
    this.password = await bcryptjs.hash(this.password, 10);
  }
}