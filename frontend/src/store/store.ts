import { createStore, persist, createTypedHooks, Store } from 'easy-peasy';
import { active, activeStore } from  './active';
import { auth, authStore } from  './auth';
import { localUpload, localUploadStore } from './localUpload';
import { modal, modalStore } from './modal';
import { sorting, sortingStore } from './sorting';

export const globalStore: Store<globalStore> = createStore(persist({
    active, auth, localUpload, modal, sorting
}));

export interface globalStore {
    active: activeStore;
    auth: authStore;
    localUpload: localUploadStore;
    modal: modalStore;
    sorting: sortingStore;
}

const typedHooks = createTypedHooks<globalStore>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;