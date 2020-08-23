import { CommentVote } from '../CommentVote';
import { Meme } from '../meme/Meme';
import { User } from '../user/User';
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany, ManyToOne} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
@Entity("comments")
export class Comment extends BaseEntity {
    @Field(() => Int) @PrimaryGeneratedColumn() id: number;

    @Field(() => String) @Column() text: string;

    @Field(() => Int)@Column() userId: number;
    @Field(() => User)@ManyToOne(() => User, user => user.comments) user: User;
    @Field(() => Int)@Column() memeId: number;
    @Field(() => Meme)@ManyToOne(() => Meme, meme => meme.comments) meme: Meme;
    @Field(() => [CommentVote])@OneToMany(() => CommentVote, commentVote => commentVote.comment) commentVotes: CommentVote[];

    @Field(() => Date)@Column("timestamp") createdAt: Date;
}
