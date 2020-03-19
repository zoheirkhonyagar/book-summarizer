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
import { getMongoManager } from 'typeorm';
import { ObjectId } from 'mongodb';

@Resolver()
export class BookResolver {
  @Query(() => Book)
  @UseMiddleware(isAuth)
  async book(@Arg('id') id: string, @Ctx() { payload }: context) {
    try {
      //get book by id
      const book = await Book.findOne({
        _id: new ObjectId(id),
        userId: payload!.userId
      });

      // check book exist or not
      if (!book) {
        throw new Error('book not found');
      }

      return book;
    } catch (error) {
      console.log(error);

      return error;
    }
  }

  @Query(() => [Book])
  @UseMiddleware(isAuth)
  async books(@Ctx() { payload }: context) {
    try {
      // get all user books by usserId
      const books = await Book.find({
        userId: payload!.userId
      });

      return books;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Mutation(() => Book)
  @UseMiddleware(isAuth)
  async createBook(
    @Arg('name', () => String) name: string,
    @Ctx() { payload }: context
  ) {
    try {
      // create book
      const book = Book.create({
        name,
        userId: payload!.userId
      });

      // get instance of mongo manager
      const manager = getMongoManager();

      // save book into db
      await manager.save(book);
      console.log(book);

      return book;
    } catch (error) {
      return error;
    }
  }
}
