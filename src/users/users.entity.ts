import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm-di';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({nullable: true})
  address: string;

}
