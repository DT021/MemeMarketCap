import { createStore, persist, createTypedHooks, Store } from 'easy-peasy';
import { active, activeStore } from  './active';
import { auth, authStore } from  './auth';

export const globalStore: Store<globalStore> = createStore(persist({
    active, auth
}));

export interface globalStore {
    active: activeStore;
    auth: authStore;
}

const typedHooks = createTypedHooks<globalStore>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;