import { BaseEntity, Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity('books')
export class Book extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  id: ObjectID;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  userId: string;
}
