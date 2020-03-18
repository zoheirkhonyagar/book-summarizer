import { Entity, ObjectIdColumn, ObjectID, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity('users')
export class User extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn({ name: '_id' })
  id: ObjectID;

  @Field()
  @Column()
  email: string;

  @Column()
  password: string;
}
