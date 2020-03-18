import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field,
  Ctx,
  UseMiddleware
} from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { User } from '../entity/User';
import { context } from '../interfaces/context';
import { createRefreshToken, createAccessToken } from '../utils/auth';
import { isAuth } from '../middlewares/isAuthMiddleware';
import { getMongoManager } from 'typeorm';
import { ObjectId } from 'mongodb';

@ObjectType()
class LoginRepsonse {
  @Field()
  accessToken: string;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hi';
  }

  // a query with auth middleware
  @Query(() => String)
  @UseMiddleware(isAuth)
  bye(@Ctx() { payload }: context) {
    console.log(payload);
    return `your user id is ${payload!.userId}`;
  }

  // get all users
  @Query(() => [User])
  async users() {
    try {
      return await User.find({});
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => Boolean)
  async revokeRefreshTokensForUser(
    @Arg('userId', () => String) userId: string
  ) {
    // get user
    const user = await User.findOne({
      where: {
        _id: new ObjectId(userId)
      }
    });

    // check user exist or not
    if (!user) throw new Error('user not found');

    // increment token version
    user.tokenVersion = user.tokenVersion + 1;

    // initial mongo manager
    const manager = getMongoManager();

    // save user
    await manager.save(user);

    return true;
  }

  // for login user
  @Mutation(() => LoginRepsonse)
  async login(
    @Arg('email') email: string,
    @Arg('password') passord: string,
    @Ctx() { res }: context
  ): Promise<LoginRepsonse> {
    // find user with email
    const user = await User.findOne({ email });

    // don't allow if user doesn't exist
    if (!user) throw new Error('Could not find user');

    // password validation
    const valid = await compare(passord, user.password);

    if (!valid) throw new Error('Information is wrong');

    // login successful
    // set refresh token in cookies
    res.cookie('jid', createRefreshToken(user), {
      httpOnly: true
    });

    return {
      accessToken: createAccessToken(user)
    };
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    // find user with email
    const user = await User.findOne({ email });

    // don't allow if user exist
    if (user) return false;

    try {
      // create hashed password
      const hashedPassword = await hash(password, 12);

      // create user
      await User.insert({
        email,
        password: hashedPassword
      });

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }
}
