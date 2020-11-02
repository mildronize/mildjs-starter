import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

type Role = 'teacher' | 'student' | 'admin' ;

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  role: Role;
}
