import { action, Action } from 'easy-peasy';

export interface ordering {
    o1: string;
    d1: string;
    o2: string;
    d2: string;
}

export interface orderingInput {
    key: string;
    value: string;
}

export type time = "Daily" | "Weekly" | "Monthly" | "Ever"

export interface sortingStore {
    time: time,
    mosaic: boolean,
    ordering: ordering,
    offset: number,
    setTime: Action<sortingStore, time>;
    toggleMosaic: Action<sortingStore, void>;
    setOrdering: Action<sortingStore, orderingInput>;
    setOffset: Action<sortingStore, number>;
};

export const sorting: sortingStore = {
    time: 'Daily',
    mosaic: true,
    ordering: {
        o1: "percent",
        d1: "DESC",
        o2: "ups",
        d2: "DESC"
    },
    offset: 0,
    
    setTime: action((state, value) => {state.time = value;}),
    toggleMosaic: action((state) => {state.mosaic = !state.mosaic}),
    setOrdering: action((state, { key, value}) => {
        switch(key) {
            case 'o1':
                state.ordering['o1'] = value;
            case 'd1':
                state.ordering['d1'] = value;
            case 'o2':
                state.ordering['o2'] = value;
            case 'd2':
                state.ordering['d2'] = value;
        }
    }),
    setOffset: action((state, value) => {state.offset = value;}),
}