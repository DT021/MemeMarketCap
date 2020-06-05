
import { createRefreshToken, sendRefreshToken } from './../auth';
import { verify } from 'jsonwebtoken';
import express from 'express';
import { User } from '../models/user/User';
import { createAccessToken } from '../auth';

const router = express.Router();
router.post('/',
    async (req, res): Promise<any> => {
        const token = req.cookies.speedcow;
        if(!token) return res.json({ accessToken: ''});
        let payload: any = null;
        try {
            payload = verify(token, process.env.REFRESH_TOKEN_SECRET!);
        } catch {
            return res.json({ accessToken: ''});
        };
        const user = await User.findOne({id: payload.user.id});
        if(!user) return res.json({ accessToken: ''});
        if(user.tokenVersion !== payload.tokenVersion) return res.json({ accessToken: '' });
        sendRefreshToken(res, createRefreshToken(user));
        return res.json({ accessToken: createAccessToken(user) });
    }
);

module.exports = router;