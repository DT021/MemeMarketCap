import { Wager } from './../wager/Wager';
import { CommentVote } from '../CommentVote';
import { MemeVote } from '../MemeVote';
import { Comment } from '../comment/Comment';
import { Meme } from '../meme/Meme';
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { ObjectType, Field, Int, Float } from "type-graphql";

const starterPic = "/dist/img/defaultAvatar.png";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    email: string;

    @Field(() => String)
    @Column()
    username: string;

    @Field(() => String)
    @Column({ default: starterPic })
    avatar: string;

    @Field(() => [Meme])
    @OneToMany(() => Meme, meme => meme.user)
    memes: Meme[];

    @Field(() => [Comment])
    @OneToMany(() => Comment, comment => comment.user)
    comments: Comment[];

    @Field(() => [MemeVote])
    @OneToMany(() => MemeVote, memeVote => memeVote.user)
    memeVotes: MemeVote[];

    @Field(() => [CommentVote])
    @OneToMany(() => CommentVote, commentVote => commentVote.user)
    commentVotes: CommentVote[];

    @Field(() => Date)
    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column() password: string;

    @Column("int", { default: 0 })
    tokenVersion: number;

    @Field(() => [Wager])
    @OneToMany(() => Wager, wager => wager.user)
    wagers: Wager[];

    @Field(() => Float)
    @Column("float", { default: 100 })
    balance: number;
}