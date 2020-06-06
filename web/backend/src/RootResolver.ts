import { RedbResolver } from './redb/RedbResolver';
import { UserResolver } from './models/user/UserResolver';
export const resolvers = [UserResolver, RedbResolver];