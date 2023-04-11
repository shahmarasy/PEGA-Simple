import { Field, Int, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Entity,
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

// Entity for storing tasks
@Entity()
@ObjectType()
export class Task extends BaseEntity {
  // Primary key column for tasks
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  // Date column for tasks
  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  // Date column for tasks
  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  // Column for tasks
  @Column()
  @Field(() => String)
  title: string;

  // Column for tasks
  @Column()
  @Field(() => Boolean)
  completed: boolean;
}