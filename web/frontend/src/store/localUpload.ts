import { action, Action } from 'easy-peasy';

export interface localUploadStore {
    localFile: string,
    setLocalFile: Action<localUploadStore, string>;
};

export const localUpload: localUploadStore = {
    localFile: "",
    setLocalFile: action((state, value) => {state.localFile = value;}),
}