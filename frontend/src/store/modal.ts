import { action, Action } from 'easy-peasy';

export interface modalStore {
    data: any,
    setData: Action<modalStore, any>;
};

export const modal: modalStore = {
    data: {},
    setData: action((state, value) => {state.data = value;}),
}