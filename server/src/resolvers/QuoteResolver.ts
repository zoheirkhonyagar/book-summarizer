import {
  Resolver,
  Query,
  UseMiddleware,
  Arg,
  Ctx,
  Mutation
} from 'type-graphql';
import { Quote } from './../entity/Quote';
import { isAuth } from './../middlewares/isAuthMiddleware';
import { context } from './../interfaces/context';
import { ObjectId } from 'mongodb';
import { getMongoManager } from 'typeorm';

@Resolver(_of => Quote)
export class QuoteResolver {
  @Query(() => Quote)
  @UseMiddleware(isAuth)
  async quote(@Arg('id') id: string, @Ctx() { payload }: context) {
    try {
      // find quote by id & user id
      const quote = await Quote.findOne({
        _id: new ObjectId(id),
        userId: payload!.userId
      });

      if (!quote) {
        throw new Error('quote not found');
      }

      return quote;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Query(() => [Quote])
  @UseMiddleware(isAuth)
  async quotes(@Ctx() { payload }: context) {
    try {
      // find all user quotes
      const quotes = await Quote.find({
        userId: payload!.userId
      });

      return quotes;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Mutation(() => Quote)
  @UseMiddleware(isAuth)
  async createQuote(
    @Arg('text', () => String) text: string,
    @Arg('bookId', () => String) bookId: string,
    @Ctx() { payload }: context
  ) {
    try {
      // create Quote
      const quote = Quote.create({
        text,
        bookId,
        userId: payload!.userId
      });

      // get instance of mongo manager
      const manager = getMongoManager();

      // save quote into db
      await manager.save(quote);
      console.log(quote);

      return quote;
    } catch (error) {
      return error;
    }
  }
}
