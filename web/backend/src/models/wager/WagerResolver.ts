import { WagerRepo } from './WagerRepo';
import { ServerContext } from '../../auth';
import { Ctx, Int } from 'type-graphql';
import { Resolver, Mutation, Arg } from 'type-graphql';
import { getCustomRepository } from 'typeorm';

@Resolver()
export class WagerResolver {
    @Mutation(() => Boolean)
    async open(
        @Ctx() { payload }: ServerContext,
        @Arg("market", () => String) market: string,
        @Arg("position", () => Int) position: number,
        @Arg("entry", () => Int) entry: number
    ): Promise<boolean> {
        if(!payload?.user.id) return false;
        return await getCustomRepository(WagerRepo).open(payload?.user.id, market, position, entry);
    }

    @Mutation(() => Boolean)
    async close(
        @Ctx() { payload }: ServerContext,
        @Arg("id", () => Int) id: number,
        @Arg("exit", () => Int) exit: number
    ): Promise<boolean> {
        if(!payload?.user.id) return false;
        return await getCustomRepository(WagerRepo).close(payload?.user.id, id, exit);
    }
}