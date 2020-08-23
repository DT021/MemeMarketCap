import { CommentData } from './_types';
import { CommentVote } from '../CommentVote';
import { Comment } from './Comment';
import { EntityRepository, Repository, getConnection } from "typeorm";
import _ from 'lodash';

@EntityRepository(Comment)
export class CommentRepo extends Repository<Comment> {
    async postComment(
        text: string,
        memeId: number,
        userId: number
    ): Promise<boolean> {
        const comment = new Comment();
        comment.text=text;
        comment.userId=userId;
        comment.memeId=memeId;
        await comment.save();
        return true;
    }
    async commentData(memeId: number): Promise<CommentData[]> {
        const comments = await getConnection().createQueryBuilder()
            .select("comment.id", "id")
            .addSelect("comment.text", "text")
            .addSelect("comment.createdAt", "createdAt")
            .from(Comment, "comment")
            .leftJoin("comment.user", "user")
            .addSelect("user.username", "username")
            .addSelect("user.avatar", "avatar")
            .where('comment."memeId" = :memeId', { memeId: memeId })
            .getRawMany();
        const final = _.map(comments, async comment => {
            const { id } = comment;
            const commentvotes = await getConnection().createQueryBuilder()
                .from(CommentVote, "commentvote")
                .select("COUNT(CASE WHEN commentvote.value=1 THEN 1 END)", "ups")
                .addSelect("COUNT(CASE WHEN commentvote.value=-1 THEN 1 END)", "downs")
                .where('commentvote."commentId"=:commentId', {commentId: id})
                .getRawOne();
            return {...comment, ...commentvotes}
        })
        return await Promise.all(final);
    }
}