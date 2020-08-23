import _ from "lodash";
import faker from 'faker';

export interface MemeLeagueMemeData {
    url: string;
    season: number;
    round: number;
};

const urls = [
    "https://images3.memedroid.com/images/UPLOADED766/5e729ea748b4e.jpeg",
    "https://images3.memedroid.com/images/UPLOADED271/5e727f321ca2d.jpeg",
    "https://images7.memedroid.com/images/UPLOADED344/5e727ed703994.jpeg",
    "https://scontent.fric1-1.fna.fbcdn.net/v/t1.0-9/86354856_2493668820896178_64227129922945024_n.png?_nc_cat=107&_nc_sid=8024bb&_nc_ohc=plGLDPc9Qa4AX_QceWd&_nc_ht=scontent.fric1-1.fna&oh=8c9f57e878dae5246969b0e632a57c5a&oe=5E9FB97A",
    "https://scontent.fric1-2.fna.fbcdn.net/v/t1.0-9/85203465_2492938577635869_5051146973369860096_n.jpg?_nc_cat=109&_nc_sid=2d5d41&_nc_ohc=68ZeWlQ-wVwAX_IYipR&_nc_ht=scontent.fric1-2.fna&oh=e5c30ec457dc2a517667db569bea832f&oe=5E9EC8B2",
    "https://scontent.fric1-1.fna.fbcdn.net/v/t1.0-9/85158894_2490406991222361_5815434810260193280_n.jpg?_nc_cat=108&_nc_sid=8024bb&_nc_ohc=wUBlGC3q36IAX-DNflu&_nc_ht=scontent.fric1-1.fna&oh=56d81c1ab348e05f61ca9997d966df22&oe=5EA07350",
    "https://scontent.fric1-1.fna.fbcdn.net/v/t1.0-9/85126484_2488774708052256_7530814799475638272_n.png?_nc_cat=102&_nc_sid=8024bb&_nc_ohc=RhNR7WNCuhUAX9RbW6G&_nc_ht=scontent.fric1-1.fna&oh=6fb724c124379e60e46ce070b6c1344e&oe=5E9E4FDB",
    "https://scontent.fric1-2.fna.fbcdn.net/v/t1.0-9/s960x960/84707520_2487447614851632_4896688859800141824_o.png?_nc_cat=104&_nc_sid=8024bb&_nc_ohc=ri9mo2Nh09gAX-pP_1j&_nc_ht=scontent.fric1-2.fna&oh=9e7fe0458bad6c57bcdbf3948732c964&oe=5EA1494D",
    "https://scontent.fric1-2.fna.fbcdn.net/v/t1.0-9/83658442_2483547605241633_8912932333275840512_n.jpg?_nc_cat=111&_nc_sid=2d5d41&_nc_ohc=O_lThwObtSsAX9_SmWd&_nc_ht=scontent.fric1-2.fna&oh=7881599c692e8a87e580c72bee07c1f1&oe=5E9F2BF8"
];

const season = 1; const round = 1;

const meme = (): string => {
    const sample = _.sample(urls);
    _.remove(urls, url => url === sample);
    if(sample) return sample;
    else return "";
};

const buildAuxSeed = (): MemeLeagueMemeData => {return {url: meme(), season, round }};

const rando = faker.random.number({'min': 3,'max': urls.length});

export const seedAux: MemeLeagueMemeData[] = _.map(
    _.range(rando),
    buildAuxSeed
);