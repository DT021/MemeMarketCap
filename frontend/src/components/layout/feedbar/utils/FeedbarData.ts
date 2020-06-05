export interface btn {
    feed: string;
    display: string;
}
export interface feedbarIF {
    btns: btn[];
    hasMoTog: boolean;
    hasTime: boolean;
}
export const feedbardata = (page: string): feedbarIF => {
    let btns: btn[], hasMoTog: boolean, hasTime: boolean; 
    switch (page) {
        case "memehub":
            btns = [
                {feed: "top", display: "Top"},
                {feed: "myfeed", display: "myFeed"},
                {feed: "contests", display: "Contests"},
                {feed: "mod", display: "Mod"},
                {feed: "oc", display: "OC"}
            ];
            hasMoTog = true;
            hasTime = true;
            break;
        case "communities":
            btns = [
                {feed: "recommendedcommunities", display: "Recommended"},
                {feed: "browsecommunities", display: "Browse"},
                {feed: "hot", display: "Hot"},
                {feed: "rising", display: "Rising"},
            ];
            hasMoTog = false;
            hasTime = false;
            break;
        case "leagues":
            btns = [
                {feed: "clans", display: "Clans"},
                {feed: "seasons", display: "Seasons"},
                {feed: "rankings", display: "Rankings"},
                {feed: "forge", display: "Forge"},
            ];
            hasMoTog = false;
            hasTime = false;
            break;
        case "contests":
            btns = [
                {feed: "exclusive", display: "Exclusive"},
                {feed: "itos", display: "ITOs"},
                {feed: "cvc", display: "CvC"},
                {feed: "pvp", display: "PvP"},
                {feed: "thepits", display: "THE PITS"}
            ];
            hasMoTog = false;
            hasTime = false;
            break;
        case "mmc":
            btns = [
                {feed: "overview", display: "Overview"},
                {feed: "reddit", display: "Reddit"},
                {feed: "9gag", display: "9Gag"},
                {feed: "memedroid", display: "Memedroid"},
                {feed: "imgflip", display: "Imgflip"}
            ];
            hasMoTog = false;
            hasTime = true;
            break;
        case "stonks":
            btns = [
                {feed: "firms", display: "Firms"},
                {feed: "economy", display: "Economy"},
                {feed: "trending", display: "Trending"},
                {feed: "SM500", display: `S${"&"}MEME-500`},
                {feed: "browsestonks", display: "Browse"}
            ];
            hasMoTog = false;
            hasTime = false;
            break;
        case "portfolio":
            btns = [
                {feed: "internetpoints", display: "Internet Points"},
                {feed: "cryptocurrency", display: "Crypto Currency"},
                {feed: "cvc", display: "CvC"},
                {feed: "pvp", display: "PvP"},
                {feed: "thepits", display: "THE PITS"}
            ];
            hasMoTog = false;
            hasTime = false;
            break;
        case "settings":
            btns = [
                {feed: "acl", display: "Access Level"},
                {feed: "steem", display: "Steem"},
                {feed: "misc", display: "Misc"},
            ];
            hasMoTog = false;
            hasTime = false;
            break;
        case "about":
            btns = [
                {feed: "theteam", display: "The Team"},
                {feed: "thevision", display: "The Vision"},
                {feed: "updates", display: "Updates"},
                {feed: "desgindetails", display: "Design Details"},
            ];
            hasMoTog = false;
            hasTime = false;
            break;
        default:
            btns = [
                {feed: "1", display: "M"},
                {feed: "2", display: "E"},
                {feed: "3", display: "M"},
                {feed: "4", display: "E"},
                {feed: "5", display: "S"}
            ];
            hasMoTog = false;
            hasTime = false;
            break;
    }
    return { btns, hasMoTog, hasTime }
}