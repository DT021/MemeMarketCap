import { action, Action } from 'easy-peasy';
import { setAccessToken } from '../accessToken';

export interface authStore {
    isAuthenticated: Boolean;
    logoutState: Action<authStore, void>;
    setAuthState: Action<authStore, string>;
};

export const auth: authStore = {
	isAuthenticated: false,

    logoutState: action(state => {
        state.isAuthenticated = false;
        setAccessToken('');
    }),

    setAuthState: action((state, accessToken: string) => {
        switch (accessToken) {
            case 'no user':
                console.log(accessToken);
                break;
            case 'bad password':
                console.log(accessToken);
                break;
            case 'email taken':
                console.log(accessToken);
                break;
            case 'username taken':
                console.log(accessToken);
                break;
            default:
                state.isAuthenticated = accessToken ? true : false;
                setAccessToken(accessToken)
                break;
        };
        
    }),
}