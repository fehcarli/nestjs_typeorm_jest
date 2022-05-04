import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'todos' })
export class TodoEntity {
  @PrimaryGeneratedColumn('uuid')
  @ApiProperty()
  uuid: string;

  @Column({type: "varchar", length: "300"})
  @ApiProperty()
  task: string;

  @Column({ name: 'is_done', type: 'boolean' })
  @ApiProperty()
  isDone: number;

  @CreateDateColumn({ name: 'created_at' })
  @ApiProperty()
  public createdAt;

  @UpdateDateColumn({ name: 'updated_at' })
  @ApiProperty()
  public updatedAt;

  @DeleteDateColumn({ name: 'deleted_at' })
  @ApiProperty()
  public deletedAt;

  constructor(todo?: Partial<TodoEntity>) {
    this.uuid = todo?.uuid;
    this.task = todo?.task;
    this.isDone = todo?.isDone;
    this.createdAt = todo?.createdAt;
    this.updatedAt = todo?.updatedAt;
    this.deletedAt = todo?.deletedAt;
  }
}
