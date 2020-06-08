import { Wager } from './../wager/Wager';
import {Entity, PrimaryGeneratedColumn, Column, BaseEntity, OneToMany} from "typeorm";
import { ObjectType, Field, Int, Float } from "type-graphql";

const starterPic = "/public/img/npc_default.png";

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

    @Field(() => Date)
    @Column("timestamp", { default: () => "CURRENT_TIMESTAMP" })
    createdAt: Date;

    @Column()
    password: string;

    @Column("int", { default: 0 })
    tokenVersion: number;

    @Field(() => [Wager])
    @OneToMany(() => Wager, wager => wager.user)
    wagers: Wager[];

    @Field(() => Float)
    @Column("float", { default: 100 })
    balance: number;
}