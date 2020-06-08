import { User } from './../user/User';
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne} from "typeorm";
import { ObjectType, Field, Int, Float } from "type-graphql";

@ObjectType()
@Entity("wagers")
export class Wager extends BaseEntity {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field(() => String)
    @Column()
    market: string;

    @Field(() => Int)
    @Column("int")
    userId: number;

    @Field(() => User)
    @ManyToOne(() => User, user => user.wagers)
    user: User;

    @Field(() => Int)
    @Column("int")
    position: number;

    @Field(() => Float)
    @Column("float")
    entry: number;

    @Field(() => Date)
    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    openedAt: Date;

    @Field(() => Float)
    @Column("float")
    exit: number;

    @Field(() => Date)
    @Column("timestamp")
    closedAt: Date;
}