import "dotenv/config";
import "reflect-metadata";
import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import path from 'path';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from "type-graphql";

import { resolvers } from './RootResolver';
import { graphqlUploadExpress } from "graphql-upload";

// import * as cron from 'node-schedule';
// cron.scheduleJob('0 * * * *', task);

(async () => {
    await createConnection();
    const app = express();
    const apolloServer = new ApolloServer({
        schema: await buildSchema({resolvers, validate: false}),
        context: ({ req, res }) => ({ req, res }),
        uploads: false
    });
    
    app.use(cors({ origin: 'http://memehub:3000', credentials: true }));
    app.get('/ping', (_, res) => { return res.send('pong') });
    app.use("/refreshToken", cookieParser(), require('./utils/refreshToken'));
    app.get('/', (_, res) => { res.sendFile(path.join(__dirname, 'build', 'index.html')) });
    app.use(express.static(path.join(__dirname, 'build')));
    app.use(graphqlUploadExpress({ maxFileSize: 10000000, maxFiles: 10 }));
    
    apolloServer.applyMiddleware({ app, cors: false });
    app.listen(5000, () => console.log('Server Started On Port 5000'));
})()
