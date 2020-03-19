import { BaseEntity, Entity, ObjectIdColumn, ObjectID, Column } from 'typeorm';
import { ObjectType, Field, ID } from 'type-graphql';

@ObjectType()
@Entity('quotes')
export class Quote extends BaseEntity {
  @Field(() => ID)
  @ObjectIdColumn()
  _id: ObjectID;

  @Field()
  @Column()
  text: string;

  @Field()
  @Column()
  bookId: string;

  @Field()
  @Column()
  userId: string;
}
