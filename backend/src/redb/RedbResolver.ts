import { Resolver, Mutation, Arg } from 'type-graphql';
import { requery } from './rejson';

@Resolver()
export class RedbResolver {
    @Mutation(() => String)
    async redb(
        @Arg("key", () => String) key: string,
        @Arg("path", () => String) path: string
    ): Promise<string> {
        try {
            const redbData = await requery(key, path);
            return redbData;
        } catch {
            return ""
        }
    }
}