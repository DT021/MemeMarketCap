import { Field, Int, ObjectType, Float } from 'type-graphql';
import { Comment } from './comment/Comment';
import { User } from './user/User';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";

@ObjectType()
@Entity()
export class CommentVote extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => Int)
    @Column()
    userId!: number;

    @Field(() => Int)
    @Column()
    commentId!: number;

    @Field(() => Comment)
    @ManyToOne(() => Comment, comment => comment.commentVotes)
    comment: Comment;

    @Field(() => User)
    @ManyToOne(() => User, user => user.commentVotes)
    user: User;

    @Field(() => Float)
    @Column()
    value: number;

    @Field(() => Date)
    @Column("timestamp")
    createdAt: Date;
}