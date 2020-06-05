import { action, Action } from 'easy-peasy';

export interface activeStore {
    page: string;
    feed: string;
    tab: string;
    
    setPage: Action<activeStore, string>;
    setFeed: Action<activeStore, string>;
    setTab: Action<activeStore, string>;
    switchPage: Action<activeStore, string>;
};

export const active: activeStore = {
    page: 'memehub',
    feed: 'top',
    tab: '',
    
    setPage: action((state, value) => {state.page = value;}),
    setFeed: action((state, value) => {state.feed = value;}),
    setTab: action((state, value) => {state.tab = value;}),

    switchPage: action((state, page) => {
        switch (page) {
            case 'memehub':
                state.page = 'memehub';
                state.feed = 'top';
                break;
            case 'communities':
                state.page = 'communities';
                state.feed = 'recommendedcommunities';
                break;
            case 'leagues':
                state.page = 'leagues';
                state.feed = 'clans';
                break;
            case 'contests':
                state.page = 'contests';
                state.feed = 'exclusive';
                break;
            case 'mmc':
                state.page = 'mmc';
                state.feed = 'overview';
                break;
            case 'stonks':
                state.page = 'stonks';
                state.feed = 'firms';
                break;
            case 'portfolio':
                state.page = 'portfolio';
                state.feed = 'internetpoints';
                break;
            case 'settings':
                state.page = 'settings';
                state.feed = 'acl';
                break;
            case 'about':
                state.page = 'about';
                state.feed = 'theteam';
                break;
            default:
                break;
        }
    }),
}