import { Wager } from './Wager';
import { EntityRepository, Repository } from "typeorm";
import moment from 'moment';

@EntityRepository(Wager)
export class WagerRepo extends Repository<Wager> {
    async open(
        userId: number,
        market: string,
        position: number,
        entry: number
    ) {
        if(!userId || userId === -1) return false;
        try {
            const newWager = new Wager();
            newWager.market = market;
            newWager.position = position;
            newWager.entry = entry;
            newWager.userId = userId;
            await newWager.save();
            return true;
        } catch (err) { return false };
    }
    async close(
        userId: number,
        id: number,
        exit: number
    ) {
        if(!userId || userId === -1) return false;
        try {
            const wager = await Wager.findOne({ id })
            if(!wager) return false;
            wager.closedAt = new Date(moment.utc().format())
            wager.exit = exit;
            await wager.save();
            return true;
        } catch (err) { return false };
    }
}