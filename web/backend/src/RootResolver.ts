import { CommentResolver } from './models/comment/CommentResolver';
import { MemeResolver } from './models/meme/MemeResolver';
import { RedbResolver } from './redb/RedbResolver';
import { UserResolver } from './models/user/UserResolver';
export const resolvers = [UserResolver, RedbResolver, MemeResolver, CommentResolver];