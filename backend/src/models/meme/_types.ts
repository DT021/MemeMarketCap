import { ObjectType, Field, Int, Float, InputType } from "type-graphql";
import { Stream } from "stream";

export interface Upload {
    filename: string;
    mimetype: string;
    encoding: string;
    createReadStream: () => Stream;
}

export interface Ordering {
    o1: string;
    d1: "ASC" | "DESC" | undefined;
    o2: string;
    d2: "ASC" | "DESC" | undefined;
}

@InputType()
export class OrderingQL {
    @Field(() => String) o1: string;
    @Field(() => String) d1: "ASC" | "DESC" | undefined;
    @Field(() => String) o2: string;
    @Field(() => String) d2: "ASC" | "DESC" | undefined;

}

@ObjectType()
export class topMeme {
    @Field(() => String) username: String;
    @Field(() => Int) memeId: number;
    @Field(() => Int) ups: number;
    @Field(() => Int) downs: number;
    @Field(() => Float) percent: number;
    @Field(() => Int) commentCount: number;
    @Field(() => Date) createdAt: Date;
    @Field(() => String) url: string;

}