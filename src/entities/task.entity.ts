import { 
  Entity,
  Column,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Task {
  @PrimaryGeneratedColumn('uuid', { name: 'tast_id' })
  id: string;

  @Column({ name: 'title', type: 'varchar', length: '40' })
  title: string;

  @Column({ name: 'content', type: 'text'})
  content: string;
}