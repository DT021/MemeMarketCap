import { ObjectType, Field } from "type-graphql";
import { User } from "./User";

@ObjectType()
export class AuthResponse {
    @Field() accessToken: string;
    @Field(() => User, {nullable:true})
    user: User | null;
}