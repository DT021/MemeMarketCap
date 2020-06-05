import { AuthResponse } from './_types';
import { sendRefreshToken } from '../../auth';
import { Response } from 'express';
import { createRefreshToken, createAccessToken } from '../../auth';
import bcrypt, { compare } from 'bcryptjs';
import { User } from './User';
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(User)
export class UserRepo extends Repository<User> {
    async register(
        email: string,
        username: string,
        password: string,
        res:Response
    ): Promise<AuthResponse> {
        if(await this.findOne({ where: {email} }))
            return { accessToken: 'email taken', user: null };
        if(await this.findOne({ where: {username} }))
            return { accessToken: 'username taken', user: null };
        const user = new User();
        user.username = username;
        user.email = email;
        user.password = await bcrypt.hash(password, await bcrypt.genSalt(10));
        await this.save(user);
        sendRefreshToken(res, createRefreshToken(user));
        return { accessToken: createAccessToken(user), user };
    }
    async login(email: string, password: string, res: Response): Promise<AuthResponse> {
        const user = await this.findOne({ where: {email} });
        if(!user) return { accessToken: "no user", user: null };
        if(!await compare(password, user.password))
            return { accessToken: 'bad password', user: null };
        sendRefreshToken(res, createRefreshToken(user));
        return { accessToken: createAccessToken(user), user };
    }
}