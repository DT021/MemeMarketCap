import { User } from './user/User';
import { Meme } from './meme/Meme';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity } from "typeorm";
import { Field, Int, ObjectType, Float } from 'type-graphql';

@ObjectType()
@Entity()
export class MemeVote extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => Int)
    @Column()
    userId: number;

    @Field(() => Int)
    @Column()
    memeId: number;

    @Field(() => Meme)
    @ManyToOne(() => Meme, meme => meme.memeVotes)
    meme: Meme;

    @Field(() => User)
    @ManyToOne(() => User, user => user.memeVotes)
    user: User;

    @Field(() => Float)
    @Column()
    value: number;

    @Field(() => Date)
    @Column("timestamp")
    createdAt: Date;
}