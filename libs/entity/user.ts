import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn } from 'typeorm';


@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: true })
  email!: string;

  @Column({ default: 'name' })
  name!: string;

  @Column({ default: '' })
  surname!: string;

  @Column()
  roleId!: number;

  @Column()
  pass!: string;

  @Column()
  course?: number;

  @Column()
  direction?: string;

  @Column()
  group?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn()
  deletedAt!: Date;
}
