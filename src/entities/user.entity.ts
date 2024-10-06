import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn({ name: 'user_id' })
  id: string;

  @Column({ name: 'username', type: 'varchar', length: '40' })
  username: string;

  @Column({ name: 'password_hash', type: 'text'})
  passwordHash: string;
}