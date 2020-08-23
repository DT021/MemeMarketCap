import { Comment } from '../comment/Comment';
import { User } from '../user/User';
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany} from "typeorm";
import { ObjectType, Field, Int } from "type-graphql";
import { MemeVote } from '../MemeVote';

@ObjectType()
@Entity("memes")
export class Meme extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    url: string;

    @Field(() => Int)
    @Column("int")
    userId: number;
    
    @Field(() => User)
    @ManyToOne(() => User, user => user.memes)
    user: User;
    
    @Field(() => [Comment])
    @OneToMany(() => Comment, comment => comment.meme)
    comments: Comment[];
    
    @Field(() => [MemeVote])
    @OneToMany(() => MemeVote, memevote => memevote.meme)
    memeVotes: MemeVote[];

    @Field(() => Date)
    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;
}
