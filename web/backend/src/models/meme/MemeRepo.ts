import { Ordering, topMeme } from './_types';
import { Meme } from './Meme';
import { EntityRepository, Repository, getConnection, getRepository } from "typeorm";
import moment from 'moment';
import { Stream } from 'stream';
import zlib from 'zlib';
import AWS from 'aws-sdk';
import _ from 'lodash';
import { MemeVote } from '../MemeVote';

AWS.config.update({ accessKeyId: process.env.AWS_ID, secretAccessKey: process.env.AWS_KEY });
const s3 = new AWS.S3();
const s3_callback = (err: any, data: any) => {
    if (err) console.log("Error", err);
    if (data) console.log("Uploaded in:", data.Location);
}

@EntityRepository(Meme)
export class MemeRepo extends Repository<Meme> {

    async findByUserId(userId: number): Promise<Meme[]> {
        return await this.find({ where: { userId }, relations: ["comments", "memeVotes"] });
    }

    async voteMeme(
        value: number,
        userId: number,
        memeId: number
    ): Promise<boolean> {
        if(await getRepository(MemeVote).findOne({ where: { userId, memeId } })) return false;
        const newMemeVote = new MemeVote();
        newMemeVote.value = value;
        newMemeVote.userId = userId;
        newMemeVote.memeId = memeId;
        await newMemeVote.save();
        return true;
    }

    async postMeme(
        id: number,
        filename: string,
        createReadStream: () => Stream
    ): Promise<boolean> {
        if(!id || id === -1) return false;
        try {
            const url = `https://memehub.s3.amazonaws.com/memehub/${filename}`;
            if(await Meme.findOne({ url })) return false;
            s3.upload({
                Bucket: 'memehub',
                Body : createReadStream().pipe(zlib.createGzip()),
                Key : "memehub/" + filename
            }, s3_callback);
            const newMeme = new Meme();
            newMeme.url = url;
            newMeme.userId = id;
            await newMeme.save();
            return true;
        } catch (err) { return false };
    }
    async topMemes(days: number, code: Ordering, offset:number): Promise<topMeme[]>{
        const { o1, d1, o2, d2 } = code;
        const memeQL = getConnection().createQueryBuilder()
            .select("meme.id", "memeId")
            .addSelect("meme.url", "url")
            .addSelect("meme.createdAt", "createdAt")
            .addSelect("meme.userId", "userId")
            .from(Meme, "meme")
            .leftJoin("meme.memeVotes", "memeVote")
            .addSelect(`
                CASE COUNT(memeVote.id)
                WHEN 0
                THEN 0
                ELSE COUNT(CASE WHEN memeVote.value=1 THEN 1 END)
                END
            `, "ups")
            .addSelect(`
                CASE COUNT(memeVote.id)
                WHEN 0
                THEN 0
                ELSE COUNT(CASE WHEN memeVote.value=-1 THEN 1 END)
                END
            `, "downs")
            .addSelect(`
                CASE COUNT(memeVote.id)
                WHEN 0
                THEN 0
                ELSE
                    COUNT(CASE WHEN memeVote.value=1 THEN 1 END)
                    /
                    COUNT(memeVote.id)
                END
            `, "percent")
            .leftJoin("meme.user", "user")
            .addSelect("user.username", "username")
            .addSelect("user.avatar", "avatar")
            .leftJoin("meme.comments", "comment")
            .addSelect("COUNT(comment.id)", "commentCount")
            .groupBy("meme.id")
            .addGroupBy("memeVote.memeId")
            .addGroupBy("user.id")
            .where('meme."createdAt" >= :cutoff', { cutoff: moment.utc().subtract(days, "days") })
        return await memeQL.orderBy(o1, d1)
            .addOrderBy(o2, d2)
            .offset(offset)
            .limit(20)
            .getRawMany();
    }
}