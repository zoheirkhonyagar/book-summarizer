import { Resolver, Query, UseMiddleware, Ctx } from 'type-graphql';
import { isAuth } from 'src/middlewares/isAuthMiddleware';
import { context } from 'src/interfaces/context';
import { Book } from 'src/entity/Book';

@Resolver()
export class BookResolver {
  @Query(() => [Book])
  @UseMiddleware(isAuth)
  async books(@Ctx() { payload }: context) {
    try {
      // check user id is set or not
      if (!payload?.userId) {
        throw new Error(`you dont have access`);
      }

      return await Book.find({
        where: {
          userId: payload.userId
        }
      });
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
