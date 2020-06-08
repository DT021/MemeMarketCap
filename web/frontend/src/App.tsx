import React from 'react';
import { StoreProvider } from 'easy-peasy';
import { ApolloProvider } from '@apollo/react-hooks';
import { Layout } from './layout';
import { apolloClient } from './apolloClient';
import { globalStore } from './store/store';

export const App: React.FC = () => {
	return (
		<ApolloProvider client={apolloClient}>
			<StoreProvider store={globalStore}>
				<Layout />
			</StoreProvider>
		</ApolloProvider>
	);
}
