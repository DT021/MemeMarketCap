import { ObjectType, Field, Int } from "type-graphql";

@ObjectType()
export class CommentData {
    @Field(() => Int) id: number;
    @Field(() => String) text: String;
    @Field(() => Date) createdAt: Date;
    @Field(() => String) username: String;
    @Field(() => String) avatar: String;
    @Field(() => Int) ups: number;
    @Field(() => Int) downs: number;
}