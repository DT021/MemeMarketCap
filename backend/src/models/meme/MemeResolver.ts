import { MemeRepo } from './MemeRepo';
import { getCustomRepository } from 'typeorm';
import { Meme } from './Meme';
import { Auth, ServerContext } from '../../auth';
import { Ctx, UseMiddleware, Mutation, Arg, Int } from 'type-graphql';
import { Resolver, Query } from 'type-graphql';
import { GraphQLUpload } from 'graphql-upload';
import { topMeme, Ordering, Upload, OrderingQL } from './_types';

@Resolver()
export class MemeResolver {

    @Query(() => Meme, {nullable: true})
    @UseMiddleware(Auth) 
    async myMemes(@Ctx() { payload }: ServerContext): Promise<Meme[]>
    { return await getCustomRepository(MemeRepo).findByUserId(payload!.user.id) }

    @Mutation(() => Boolean)
    @UseMiddleware(Auth) 
    async postMeme(
        @Ctx() { payload }: ServerContext,
        @Arg("file", () => GraphQLUpload) { createReadStream, filename }: Upload
    ): Promise<boolean> {
        return await getCustomRepository(MemeRepo).postMeme(payload!.user.id, filename, createReadStream)
    }

    @Mutation(() => [topMeme])
    async topMemes(
        @Arg("days", () => Int) days: number,
        @Arg("ordering", () => OrderingQL) ordering: Ordering,
        @Arg("offset", () => Int) offset: number
    ): Promise<topMeme[]> {
        return await getCustomRepository(MemeRepo).topMemes(days, ordering, offset);
    }

    @Mutation(() => Boolean)
    @UseMiddleware(Auth) 
    async voteMeme(
        @Ctx() { payload }: ServerContext,
        @Arg("value", () => Int) value: number,
        @Arg("memeId", () => Int) memeId: number
    ): Promise<boolean> {
        return await getCustomRepository(MemeRepo).voteMeme(value, payload!.user.id, memeId)
    }
}