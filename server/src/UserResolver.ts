import {
  Resolver,
  Query,
  Mutation,
  Arg,
  ObjectType,
  Field
} from 'type-graphql';
import { hash, compare } from 'bcryptjs';
import { User } from './entity/User';

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

  @Query(() => [User])
  async users() {
    try {
      return await User.find({});
    } catch (error) {
      return error;
    }
  }

  @Mutation(() => LoginRepsonse)
  async login(
    @Arg('email') email: string,
    @Arg('password') passord: string
  ): Promise<LoginRepsonse> {
    // find user with email
    const user = await User.findOne({ email });

    // don't allow if user doesn't exist
    if (!user) throw new Error('Could not find user');

    const valid = compare(passord, user.password);

    if (!valid) throw new Error('Information is wrong');

    // login successful

    return {
      accessToken: ''
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
