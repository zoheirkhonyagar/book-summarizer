import {
  Resolver,
  Query,
  UseMiddleware,
  Ctx,
  Mutation,
  Arg
} from 'type-graphql';
import { isAuth } from './../middlewares/isAuthMiddleware';
import { context } from './../interfaces/context';
import { Book } from './../entity/Book';
// import { getMongoManager } from 'typeorm';

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  @UseMiddleware(isAuth)
  async books(@Ctx() { payload }: context) {
    try {
      return await Book.find({
        where: {
          userId: payload!.userId
        }
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Mutation(() => Book)
  @UseMiddleware(isAuth)
  async addBook(
    @Arg('name', () => String) name: string,
    @Ctx() { payload }: context
  ) {
    // create book
    const book = Book.create({
      name,
      userId: payload!.userId
    });

    return book;
  }
}
