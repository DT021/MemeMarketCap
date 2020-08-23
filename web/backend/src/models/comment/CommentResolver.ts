import { CommentData } from './_types';
import { CommentRepo } from './CommentRepo';
import { getCustomRepository } from 'typeorm';
import { Auth, ServerContext } from '../../auth';
import { Ctx, UseMiddleware, Mutation, Arg, Int } from 'type-graphql';
import { Resolver } from 'type-graphql';

@Resolver()
export class CommentResolver {

    @Mutation(() => Boolean)
    @UseMiddleware(Auth)
    async postComment(
        @Ctx() { payload }: ServerContext,
        @Arg("text", () => String) text: string,
        @Arg("memeId", () => Int) memeId: number
    ){ return await getCustomRepository(CommentRepo).postComment(text, memeId, payload!.user.id); }

    @Mutation(() => [CommentData])
    async commentData(
        @Arg("memeId", () => Int) memeId: number
    ): Promise<CommentData[]> {
        return await getCustomRepository(CommentRepo).commentData(memeId)
    }
}