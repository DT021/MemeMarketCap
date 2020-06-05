import { User } from './models/user/User';
import { sign, verify } from 'jsonwebtoken';
import { MiddlewareFn } from 'type-graphql';
import { Request, Response } from 'express';

export interface ServerContext {
    req: Request;
    res: Response;
    payload?: { user: { id: number } };
}

export const createAccessToken = (user: User): string => {
    return sign(
        { user: { id: user.id } },
        process.env.ACCESS_TOKEN_SECRET!,
        {expiresIn: "15m"}
    )
};

export const createRefreshToken = (user: User): string => {
    return sign(
        {
            user: { id: user.id },
            tokenVersion: user.tokenVersion
        },
        process.env.REFRESH_TOKEN_SECRET!,
        {expiresIn: "7d"}
    )
};

export const sendRefreshToken = (res: Response, token: string): void =>
{
    res.cookie( 'speedcow', token,
        {
            httpOnly: true,
            path: '/refreshToken',
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
        }
    );
};

export const Auth: MiddlewareFn<ServerContext> = ({ context }, next): Promise<CallableFunction> => {
    const { req } = context;
    const authorization = req.headers['authorization'];
    if(!authorization){
        console.log('No Auth Header');
        context.payload = { user: { id:-1} };
        return next();
    }
    try {
        const token = authorization?.split(" ")[1];
        const payload = verify(token, process.env.ACCESS_TOKEN_SECRET!);
        context.payload = payload as any;
    } catch (error) {
        context.payload = { user: { id:-1 } } };
        return next();
};