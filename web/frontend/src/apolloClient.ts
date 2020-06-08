import jwtDecode from 'jwt-decode';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';
import { getAccessToken, setAccessToken } from './accessToken';
import { TokenRefreshLink } from 'apollo-link-token-refresh';
import { createUploadLink } from "apollo-upload-client";
import Axios from 'axios';

const cache = new InMemoryCache({});

const requestLink = new ApolloLink(
	(operation, forward) =>
		new Observable(observer => {
			let handle: any;
			Promise.resolve(operation)
				.then(op => op.setContext({headers:{authorization: `bearer ${getAccessToken()}`}}))
				.then(() => { handle = forward(operation).subscribe({
					next: observer.next.bind(observer), error: observer.error.bind(observer),
					complete: observer.complete.bind(observer)});
				}).catch(observer.error.bind(observer));
			return () => { if(handle) handle.unsubscribe(); };
		})
);

export const apolloClient = new ApolloClient({
	link: ApolloLink.from([
		new TokenRefreshLink({
			accessTokenField: "accessToken",
			isTokenValidOrUndefined: (): boolean => {
				const token = getAccessToken();
				if(!token) return true;
				try {
					const { exp } = jwtDecode(token);
					if(Date.now() >= exp *1000) return false;
					else return true;
				} catch { return false; }
			},
			fetchAccessToken: () => {
				return Axios.create({ withCredentials: true}).post('/refreshToken');
			},
			handleFetch: accessToken => { setAccessToken(accessToken); },
			handleError: err => {
				console.warn("Your Refresh token is invalid. Try to relogin.");
				console.error(err)
			}
		}),
		onError(({ graphQLErrors, networkError }) => {
			console.log(graphQLErrors);
			console.log(networkError);
		}),
		requestLink,
		createUploadLink({ uri: "/graphql", credentials: 'include' })
	]), cache
});