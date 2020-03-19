import { Resolver, Query, UseMiddleware, Arg, Ctx } from 'type-graphql';
import { Quote } from './../entity/Quote';
import { isAuth } from './../middlewares/isAuthMiddleware';
import { context } from './../interfaces/context';
import { ObjectId } from 'mongodb';

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
        throw new Error('book not found');
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
}
