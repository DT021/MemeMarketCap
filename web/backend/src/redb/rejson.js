import { promisify } from "util";

import redis from 'redis';
import rejson from 'redis-rejson';
rejson(redis);
const reclient = redis.createClient(6379, 'localhost');
const getAsync = promisify(reclient.json_get).bind(reclient);
export const requery = async (key, path) => {
    return getAsync(key, path).then(r => {return r})
};