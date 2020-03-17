import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { hash } from 'bcryptjs';
import { User } from './entity/User';

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hi';
  }

  @Query(() => [User])
  async users() {
    try {
      return await User.find({});
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => Boolean)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ) {
    // create hashed password
    const hashedPassword = await hash(password, 12);

    try {
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
