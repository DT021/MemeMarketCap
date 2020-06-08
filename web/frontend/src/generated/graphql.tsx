import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type AuthResponse = {
   __typename?: 'AuthResponse';
  accessToken: Scalars['String'];
  user?: Maybe<User>;
};


export type Mutation = {
   __typename?: 'Mutation';
  open: Scalars['Boolean'];
  close: Scalars['Boolean'];
  redb: Scalars['String'];
  register: AuthResponse;
  revokeRefreshTokens: Scalars['Boolean'];
  login: AuthResponse;
  logout: Scalars['Boolean'];
};


export type MutationOpenArgs = {
  entry: Scalars['Int'];
  position: Scalars['Int'];
  market: Scalars['String'];
};


export type MutationCloseArgs = {
  exit: Scalars['Int'];
  id: Scalars['Int'];
};


export type MutationRedbArgs = {
  path: Scalars['String'];
  key: Scalars['String'];
};


export type MutationRegisterArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationRevokeRefreshTokensArgs = {
  id: Scalars['Int'];
};


export type MutationLoginArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  me?: Maybe<User>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
  avatar: Scalars['String'];
  createdAt: Scalars['DateTime'];
  wagers: Array<Wager>;
  balance: Scalars['Float'];
};

export type Wager = {
   __typename?: 'Wager';
  id: Scalars['Int'];
  market: Scalars['String'];
  userId: Scalars['Int'];
  user: User;
  position: Scalars['Int'];
  entry: Scalars['Float'];
  openedAt: Scalars['DateTime'];
  exit: Scalars['Float'];
  closedAt: Scalars['DateTime'];
};

export type MeQueryVariables = {};


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'avatar'>
  )> }
);

export type RegisterMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'accessToken'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'avatar' | 'username'>
    )> }
  ) }
);

export type LoginMutationVariables = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'AuthResponse' }
    & Pick<AuthResponse, 'accessToken'>
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'avatar' | 'username'>
    )> }
  ) }
);

export type LogoutMutationVariables = {};


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type LoadRedbMutationVariables = {
  key: Scalars['String'];
  path: Scalars['String'];
};


export type LoadRedbMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'redb'>
);

export type OpenMutationVariables = {
  market: Scalars['String'];
  position: Scalars['Int'];
  entry: Scalars['Int'];
};


export type OpenMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'open'>
);

export type CloseMutationVariables = {
  id: Scalars['Int'];
  exit: Scalars['Int'];
};


export type CloseMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'close'>
);


export const MeDocument = gql`
    query Me {
  me {
    id
    username
    avatar
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;
export const RegisterDocument = gql`
    mutation Register($email: String!, $password: String!, $username: String!) {
  register(email: $email, password: $password, username: $username) {
    accessToken
    user {
      id
      avatar
      username
    }
  }
}
    `;
export type RegisterMutationFn = ApolloReactCommon.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      username: // value for 'username'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return ApolloReactHooks.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = ApolloReactCommon.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = ApolloReactCommon.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    accessToken
    user {
      id
      avatar
      username
    }
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const LoadRedbDocument = gql`
    mutation LoadRedb($key: String!, $path: String!) {
  redb(key: $key, path: $path)
}
    `;
export type LoadRedbMutationFn = ApolloReactCommon.MutationFunction<LoadRedbMutation, LoadRedbMutationVariables>;

/**
 * __useLoadRedbMutation__
 *
 * To run a mutation, you first call `useLoadRedbMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoadRedbMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loadRedbMutation, { data, loading, error }] = useLoadRedbMutation({
 *   variables: {
 *      key: // value for 'key'
 *      path: // value for 'path'
 *   },
 * });
 */
export function useLoadRedbMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoadRedbMutation, LoadRedbMutationVariables>) {
        return ApolloReactHooks.useMutation<LoadRedbMutation, LoadRedbMutationVariables>(LoadRedbDocument, baseOptions);
      }
export type LoadRedbMutationHookResult = ReturnType<typeof useLoadRedbMutation>;
export type LoadRedbMutationResult = ApolloReactCommon.MutationResult<LoadRedbMutation>;
export type LoadRedbMutationOptions = ApolloReactCommon.BaseMutationOptions<LoadRedbMutation, LoadRedbMutationVariables>;
export const OpenDocument = gql`
    mutation Open($market: String!, $position: Int!, $entry: Int!) {
  open(market: $market, position: $position, entry: $entry)
}
    `;
export type OpenMutationFn = ApolloReactCommon.MutationFunction<OpenMutation, OpenMutationVariables>;

/**
 * __useOpenMutation__
 *
 * To run a mutation, you first call `useOpenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useOpenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [openMutation, { data, loading, error }] = useOpenMutation({
 *   variables: {
 *      market: // value for 'market'
 *      position: // value for 'position'
 *      entry: // value for 'entry'
 *   },
 * });
 */
export function useOpenMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<OpenMutation, OpenMutationVariables>) {
        return ApolloReactHooks.useMutation<OpenMutation, OpenMutationVariables>(OpenDocument, baseOptions);
      }
export type OpenMutationHookResult = ReturnType<typeof useOpenMutation>;
export type OpenMutationResult = ApolloReactCommon.MutationResult<OpenMutation>;
export type OpenMutationOptions = ApolloReactCommon.BaseMutationOptions<OpenMutation, OpenMutationVariables>;
export const CloseDocument = gql`
    mutation Close($id: Int!, $exit: Int!) {
  close(id: $id, exit: $exit)
}
    `;
export type CloseMutationFn = ApolloReactCommon.MutationFunction<CloseMutation, CloseMutationVariables>;

/**
 * __useCloseMutation__
 *
 * To run a mutation, you first call `useCloseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCloseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [closeMutation, { data, loading, error }] = useCloseMutation({
 *   variables: {
 *      id: // value for 'id'
 *      exit: // value for 'exit'
 *   },
 * });
 */
export function useCloseMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CloseMutation, CloseMutationVariables>) {
        return ApolloReactHooks.useMutation<CloseMutation, CloseMutationVariables>(CloseDocument, baseOptions);
      }
export type CloseMutationHookResult = ReturnType<typeof useCloseMutation>;
export type CloseMutationResult = ApolloReactCommon.MutationResult<CloseMutation>;
export type CloseMutationOptions = ApolloReactCommon.BaseMutationOptions<CloseMutation, CloseMutationVariables>;