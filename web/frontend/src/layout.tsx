import React, { useState } from 'react'
import { Navbar } from './components/layout/navbar/Navbar'
import { Leftbar } from './components/layout/leftbar/Leftbar'
import { Feedbar } from './components/layout/feedbar/Feedbar'
import { PageHook } from './PageHook'
import Axios from 'axios'
import useAsyncEffect from 'use-async-effect';
import styled from 'styled-components';
import { maxWidth } from './styles'
import { useStoreActions } from './store/store'

export const Layout = (): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const transport = Axios.create({ withCredentials: true})
    const { setAuthState } = useStoreActions(actions => actions.auth);
    useAsyncEffect(async () => {
        const { data: { accessToken } } = await transport.post('/refreshToken');
        setLoading(false); setAuthState(accessToken);
	}, [setAuthState]);
    return loading ? <></> : <Wrapper><Navbar /><Leftbar /><Feedbar /><PageHook /></Wrapper>
};

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 9vh 10vh 9fr;
    grid-template-columns: 1fr 4fr;
    grid-template-areas: 
        'navbar navbar'
        'leftbar feedbar'
        'leftbar feed';
    width: 100vw;
    height: 100vh;
    max-width: ${maxWidth};
    padding: 0;
    margin: 0;
`;