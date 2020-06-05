import React from 'react';
import styled from 'styled-components';
import { useLogoutMutation } from '../../../../generated/graphql';
import { setAccessToken } from '../../../../accessToken';
import { useStoreState, useStoreActions } from '../../../../store/store';

export const LoginBtn = () => {
    const { isAuthenticated } = useStoreState(state => state.auth);
    const { logoutState } = useStoreActions(actions => actions.auth);
    const { switchPage } = useStoreActions(actions => actions.active);
    const [logoutBackend, { client }] = useLogoutMutation();
    const logout = async () => {
        await logoutBackend();
        await client!.clearStore();
        logoutState();
        setAccessToken("");
        switchPage("memehub");
    };
    return isAuthenticated
        ? <i className="fal fa-sign-out-alt fa-lg" onClick={logout}></i>
        : <div data-toggle="modal" data-target="#loginModal" ><AuthBtn>Login</AuthBtn></div>;
};

const AuthBtn = styled.p`
    height: 100%;
    display: flex;
    align-items: center;
    border: solid 1px
    transparent; border-radius: 10%;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    transition: all 0.2s ease-in;
    &:hover{cursor: pointer; border: solid 1px #333;}
`;