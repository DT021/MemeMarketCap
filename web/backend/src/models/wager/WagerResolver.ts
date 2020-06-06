import { AuthResponse } from './_types';
import { sendRefreshToken } from '../../auth';
import { Auth, ServerContext } from '../../auth';
import { UserRepo } from './WagerRepo';
import { Ctx, UseMiddleware, Int } from 'type-graphql';
import { User } from './User';
import { Resolver, Query, Mutation, Arg } from 'type-graphql';
import { getConnection, getCustomRepository } from 'typeorm';

@Resolver()
export class UserResolver {

    @Query(() => [User])
    async users(): Promise<User[]> {
        return await User.find({
            relations: ["memes", "comments", "memeVotes", "commentVotes"]
        });
    }

    @Query(() => User, {nullable: true})
    @UseMiddleware(Auth) 
    async me(@Ctx() { payload }: ServerContext): Promise<User | undefined> {
        return await User.findOne(payload!.user.id);
    }

    @Mutation(() => AuthResponse)
    async register(
        @Ctx() { res }: ServerContext,
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Arg('username') username: string
    ): Promise<AuthResponse> {
        return await getCustomRepository(UserRepo).register(email, username, password, res);
    }

    @Mutation(() => Boolean)
    async revokeRefreshTokens(
        @Arg("id", () => Int) id:number
    ): Promise<boolean> {
        await getConnection().getRepository(User).increment({id}, "tokenVersion", 1);
        return true;
    }
    
    @Mutation(() => AuthResponse)
    async login(
        @Arg('email') email: string,
        @Arg('password') password: string,
        @Ctx() { res }: ServerContext
    ): Promise<AuthResponse> {
        return await getCustomRepository(UserRepo).login(email, password, res);
    }

    @Mutation(() => Boolean)
    async logout(
        @Ctx() {res}: ServerContext
    ): Promise<boolean> {
        sendRefreshToken(res, "");
        return true;
    }
}