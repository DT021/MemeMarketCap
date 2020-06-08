import React, { useState } from 'react'
import Axios from 'axios'
import useAsyncEffect from 'use-async-effect';
import { useStoreActions } from './store/store'
import styled from 'styled-components';
import { theme } from './colors';

export const Layout = (): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const transport = Axios.create({ withCredentials: true})
    const { setAuthState } = useStoreActions(actions => actions.auth);
    useAsyncEffect(async () => {
        const { data: { accessToken } } = await transport.post('/refreshToken');
        setLoading(false);
        setAuthState(accessToken);
	}, [setAuthState]);
    return loading ? <>test</> : <Wrapper><Logo /></Wrapper>
};

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 8vh auto;
    grid-template-areas: 'navbar' 'content';
    overflow: auto;
    background-color: ${theme};
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 2rem;
    padding-right: 2rem;
`;

const Logo = styled.img.attrs({
    src: "/img/main-logo.png",
    alt: "I cAnT fInD tHe ImAgE"
})`
    width: 10vw;
`;