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
  DateTime: any;
  Upload: any;
};

export type AuthResponse = {
   __typename?: 'AuthResponse';
  accessToken: Scalars['String'];
  user?: Maybe<User>;
};

export type Comment = {
   __typename?: 'Comment';
  id: Scalars['Int'];
  text: Scalars['String'];
  userId: Scalars['Int'];
  user: User;
  memeId: Scalars['Int'];
  meme: Meme;
  commentVotes: Array<CommentVote>;
  createdAt: Scalars['DateTime'];
};

export type CommentData = {
   __typename?: 'CommentData';
  id: Scalars['Int'];
  text: Scalars['String'];
  createdAt: Scalars['DateTime'];
  username: Scalars['String'];
  avatar: Scalars['String'];
  ups: Scalars['Int'];
  downs: Scalars['Int'];
};

export type CommentVote = {
   __typename?: 'CommentVote';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  commentId: Scalars['Int'];
  comment: Comment;
  user: User;
  value: Scalars['Float'];
  createdAt: Scalars['DateTime'];
};


export type Meme = {
   __typename?: 'Meme';
  id: Scalars['Int'];
  url: Scalars['String'];
  userId: Scalars['Int'];
  user: User;
  comments: Array<Comment>;
  memeVotes: Array<MemeVote>;
  createdAt: Scalars['DateTime'];
};

export type MemeVote = {
   __typename?: 'MemeVote';
  id: Scalars['Int'];
  userId: Scalars['Int'];
  memeId: Scalars['Int'];
  meme: Meme;
  user: User;
  value: Scalars['Float'];
  createdAt: Scalars['DateTime'];
};

export type Mutation = {
   __typename?: 'Mutation';
  postComment: Scalars['Boolean'];
  commentData: Array<CommentData>;
  postMeme: Scalars['Boolean'];
  topMemes: Array<TopMeme>;
  voteMeme: Scalars['Boolean'];
  redb: Scalars['String'];
  register: AuthResponse;
  revokeRefreshTokens: Scalars['Boolean'];
  login: AuthResponse;
  logout: Scalars['Boolean'];
};


export type MutationPostCommentArgs = {
  memeId: Scalars['Int'];
  text: Scalars['String'];
};


export type MutationCommentDataArgs = {
  memeId: Scalars['Int'];
};


export type MutationPostMemeArgs = {
  file: Scalars['Upload'];
};


export type MutationTopMemesArgs = {
  offset: Scalars['Int'];
  ordering: OrderingQl;
  days: Scalars['Int'];
};


export type MutationVoteMemeArgs = {
  memeId: Scalars['Int'];
  value: Scalars['Int'];
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

export type OrderingQl = {
  o1: Scalars['String'];
  d1: Scalars['String'];
  o2: Scalars['String'];
  d2: Scalars['String'];
};

export type Query = {
   __typename?: 'Query';
  myMemes?: Maybe<Meme>;
  users: Array<User>;
  me?: Maybe<User>;
};

export type TopMeme = {
   __typename?: 'topMeme';
  username: Scalars['String'];
  memeId: Scalars['Int'];
  ups: Scalars['Int'];
  downs: Scalars['Int'];
  percent: Scalars['Float'];
  commentCount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  url: Scalars['String'];
};


export type User = {
   __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  username: Scalars['String'];
  avatar: Scalars['String'];
  memes: Array<Meme>;
  comments: Array<Comment>;
  memeVotes: Array<MemeVote>;
  commentVotes: Array<CommentVote>;
  createdAt: Scalars['DateTime'];
};

export type PostCommentMutationVariables = {
  text: Scalars['String'];
  memeId: Scalars['Int'];
};


export type PostCommentMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'postComment'>
);

export type CommentDataMutationVariables = {
  memeId: Scalars['Int'];
};


export type CommentDataMutation = (
  { __typename?: 'Mutation' }
  & { commentData: Array<(
    { __typename?: 'CommentData' }
    & Pick<CommentData, 'id' | 'text' | 'createdAt' | 'username' | 'avatar' | 'ups' | 'downs'>
  )> }
);

export type PostMemeMutationVariables = {
  file: Scalars['Upload'];
};


export type PostMemeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'postMeme'>
);

export type MyMemesQueryVariables = {};


export type MyMemesQuery = (
  { __typename?: 'Query' }
  & { myMemes?: Maybe<(
    { __typename?: 'Meme' }
    & Pick<Meme, 'id' | 'url' | 'createdAt'>
    & { comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id'>
    )>, memeVotes: Array<(
      { __typename?: 'MemeVote' }
      & Pick<MemeVote, 'userId'>
    )> }
  )> }
);

export type TopMemesMutationVariables = {
  days: Scalars['Int'];
  ordering: OrderingQl;
  offset: Scalars['Int'];
};


export type TopMemesMutation = (
  { __typename?: 'Mutation' }
  & { topMemes: Array<(
    { __typename?: 'topMeme' }
    & Pick<TopMeme, 'username' | 'memeId' | 'ups' | 'downs' | 'percent' | 'commentCount' | 'createdAt' | 'url'>
  )> }
);

export type VoteMemeMutationVariables = {
  value: Scalars['Int'];
  memeId: Scalars['Int'];
};


export type VoteMemeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'voteMeme'>
);

export type UsersQueryVariables = {};


export type UsersQuery = (
  { __typename?: 'Query' }
  & { users: Array<(
    { __typename?: 'User' }
    & Pick<User, 'email' | 'id'>
  )> }
);

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


export const PostCommentDocument = gql`
    mutation PostComment($text: String!, $memeId: Int!) {
  postComment(text: $text, memeId: $memeId)
}
    `;
export type PostCommentMutationFn = ApolloReactCommon.MutationFunction<PostCommentMutation, PostCommentMutationVariables>;

/**
 * __usePostCommentMutation__
 *
 * To run a mutation, you first call `usePostCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postCommentMutation, { data, loading, error }] = usePostCommentMutation({
 *   variables: {
 *      text: // value for 'text'
 *      memeId: // value for 'memeId'
 *   },
 * });
 */
export function usePostCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PostCommentMutation, PostCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<PostCommentMutation, PostCommentMutationVariables>(PostCommentDocument, baseOptions);
      }
export type PostCommentMutationHookResult = ReturnType<typeof usePostCommentMutation>;
export type PostCommentMutationResult = ApolloReactCommon.MutationResult<PostCommentMutation>;
export type PostCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<PostCommentMutation, PostCommentMutationVariables>;
export const CommentDataDocument = gql`
    mutation CommentData($memeId: Int!) {
  commentData(memeId: $memeId) {
    id
    text
    createdAt
    username
    avatar
    ups
    downs
  }
}
    `;
export type CommentDataMutationFn = ApolloReactCommon.MutationFunction<CommentDataMutation, CommentDataMutationVariables>;

/**
 * __useCommentDataMutation__
 *
 * To run a mutation, you first call `useCommentDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCommentDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [commentDataMutation, { data, loading, error }] = useCommentDataMutation({
 *   variables: {
 *      memeId: // value for 'memeId'
 *   },
 * });
 */
export function useCommentDataMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<CommentDataMutation, CommentDataMutationVariables>) {
        return ApolloReactHooks.useMutation<CommentDataMutation, CommentDataMutationVariables>(CommentDataDocument, baseOptions);
      }
export type CommentDataMutationHookResult = ReturnType<typeof useCommentDataMutation>;
export type CommentDataMutationResult = ApolloReactCommon.MutationResult<CommentDataMutation>;
export type CommentDataMutationOptions = ApolloReactCommon.BaseMutationOptions<CommentDataMutation, CommentDataMutationVariables>;
export const PostMemeDocument = gql`
    mutation PostMeme($file: Upload!) {
  postMeme(file: $file)
}
    `;
export type PostMemeMutationFn = ApolloReactCommon.MutationFunction<PostMemeMutation, PostMemeMutationVariables>;

/**
 * __usePostMemeMutation__
 *
 * To run a mutation, you first call `usePostMemeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `usePostMemeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [postMemeMutation, { data, loading, error }] = usePostMemeMutation({
 *   variables: {
 *      file: // value for 'file'
 *   },
 * });
 */
export function usePostMemeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<PostMemeMutation, PostMemeMutationVariables>) {
        return ApolloReactHooks.useMutation<PostMemeMutation, PostMemeMutationVariables>(PostMemeDocument, baseOptions);
      }
export type PostMemeMutationHookResult = ReturnType<typeof usePostMemeMutation>;
export type PostMemeMutationResult = ApolloReactCommon.MutationResult<PostMemeMutation>;
export type PostMemeMutationOptions = ApolloReactCommon.BaseMutationOptions<PostMemeMutation, PostMemeMutationVariables>;
export const MyMemesDocument = gql`
    query MyMemes {
  myMemes {
    id
    url
    comments {
      id
    }
    memeVotes {
      userId
    }
    createdAt
  }
}
    `;

/**
 * __useMyMemesQuery__
 *
 * To run a query within a React component, call `useMyMemesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyMemesQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyMemesQuery({
 *   variables: {
 *   },
 * });
 */
export function useMyMemesQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MyMemesQuery, MyMemesQueryVariables>) {
        return ApolloReactHooks.useQuery<MyMemesQuery, MyMemesQueryVariables>(MyMemesDocument, baseOptions);
      }
export function useMyMemesLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MyMemesQuery, MyMemesQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MyMemesQuery, MyMemesQueryVariables>(MyMemesDocument, baseOptions);
        }
export type MyMemesQueryHookResult = ReturnType<typeof useMyMemesQuery>;
export type MyMemesLazyQueryHookResult = ReturnType<typeof useMyMemesLazyQuery>;
export type MyMemesQueryResult = ApolloReactCommon.QueryResult<MyMemesQuery, MyMemesQueryVariables>;
export const TopMemesDocument = gql`
    mutation TopMemes($days: Int!, $ordering: OrderingQL!, $offset: Int!) {
  topMemes(days: $days, ordering: $ordering, offset: $offset) {
    username
    memeId
    ups
    downs
    percent
    commentCount
    createdAt
    url
  }
}
    `;
export type TopMemesMutationFn = ApolloReactCommon.MutationFunction<TopMemesMutation, TopMemesMutationVariables>;

/**
 * __useTopMemesMutation__
 *
 * To run a mutation, you first call `useTopMemesMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useTopMemesMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [topMemesMutation, { data, loading, error }] = useTopMemesMutation({
 *   variables: {
 *      days: // value for 'days'
 *      ordering: // value for 'ordering'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useTopMemesMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<TopMemesMutation, TopMemesMutationVariables>) {
        return ApolloReactHooks.useMutation<TopMemesMutation, TopMemesMutationVariables>(TopMemesDocument, baseOptions);
      }
export type TopMemesMutationHookResult = ReturnType<typeof useTopMemesMutation>;
export type TopMemesMutationResult = ApolloReactCommon.MutationResult<TopMemesMutation>;
export type TopMemesMutationOptions = ApolloReactCommon.BaseMutationOptions<TopMemesMutation, TopMemesMutationVariables>;
export const VoteMemeDocument = gql`
    mutation VoteMeme($value: Int!, $memeId: Int!) {
  voteMeme(value: $value, memeId: $memeId)
}
    `;
export type VoteMemeMutationFn = ApolloReactCommon.MutationFunction<VoteMemeMutation, VoteMemeMutationVariables>;

/**
 * __useVoteMemeMutation__
 *
 * To run a mutation, you first call `useVoteMemeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVoteMemeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [voteMemeMutation, { data, loading, error }] = useVoteMemeMutation({
 *   variables: {
 *      value: // value for 'value'
 *      memeId: // value for 'memeId'
 *   },
 * });
 */
export function useVoteMemeMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<VoteMemeMutation, VoteMemeMutationVariables>) {
        return ApolloReactHooks.useMutation<VoteMemeMutation, VoteMemeMutationVariables>(VoteMemeDocument, baseOptions);
      }
export type VoteMemeMutationHookResult = ReturnType<typeof useVoteMemeMutation>;
export type VoteMemeMutationResult = ApolloReactCommon.MutationResult<VoteMemeMutation>;
export type VoteMemeMutationOptions = ApolloReactCommon.BaseMutationOptions<VoteMemeMutation, VoteMemeMutationVariables>;
export const UsersDocument = gql`
    query Users {
  users {
    email
    id
  }
}
    `;

/**
 * __useUsersQuery__
 *
 * To run a query within a React component, call `useUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties 
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useUsersQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<UsersQuery, UsersQueryVariables>) {
        return ApolloReactHooks.useQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
      }
export function useUsersLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<UsersQuery, UsersQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<UsersQuery, UsersQueryVariables>(UsersDocument, baseOptions);
        }
export type UsersQueryHookResult = ReturnType<typeof useUsersQuery>;
export type UsersLazyQueryHookResult = ReturnType<typeof useUsersLazyQuery>;
export type UsersQueryResult = ApolloReactCommon.QueryResult<UsersQuery, UsersQueryVariables>;
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