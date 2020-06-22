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
    return loading ? <>test</> : <Wrapper><Navbar /></Wrapper>
};

const Navbar = () => {
    return <>
        <Nav>
            <Logo />
            <ProfilePic />
        </Nav>
    </>
};

const Content = () => {
    return <>
        
    </>
};

const Nav = styled.nav`
    display: flex;
    justify-content: space-between;
    padding-left: 4rem;
    padding-right: 4rem;
`;

const Wrapper = styled.div`
    display: grid;
    grid-template-rows: 8vh auto;
    grid-template-areas: 'navbar' 'content';
    overflow: auto;
    background-color: ${theme};
    padding: 0;
    margin: 0;
`;

const Logo = styled.img.attrs({
    src: "/img/main-logo.png",
    alt: "I cAnT fInD tHe ImAgE"
})`
    width: 10vw;
`;

const ProfilePic = styled.img.attrs({
    src: "/img/npc_default.jpg",
    alt: "I cAnT fInD tHe ImAgE"
})`
    width: 3vw;
    border-radius: 50%;
`;