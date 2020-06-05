import React, { useEffect, useState } from 'react'
import { Tabbar } from './utils/Tabbar'
import { TopTable } from './utils/TopTable';
import { useLoadRedbMutation } from '../../../generated/graphql';
import { useStoreState } from 'easy-peasy';
import useAsyncEffect from 'use-async-effect';
import styled from 'styled-components';
import { filter_by_subreddit } from './utils/misc';
import { TopQuery } from '../utils/redb';

export const Reddit = () => {
    const { tab } = useStoreState(state => state.active);
    const [redbql] = useLoadRedbMutation();
    const [top, setTop] = useState(null);
    const [main, setMain] = useState(null);
    
    useAsyncEffect(async () => {
        const { data } = await redbql(TopQuery);
        setTop(JSON.parse(data.redb));
    }, [redbql, setTop]);

    useEffect(() => {
        if(top) setMain(<TopTable data={filter_by_subreddit(top, tab)[0]}/>);
        else setMain(<img src="/dist/img/coming-soon.jpg" alt=""/>);
    }, [tab, top])

    return <MMCRedditStyle><Tabbar /><Content>{main}</Content></MMCRedditStyle>
}

const MMCRedditStyle = styled.div`
    display: grid;
    grid-area: main;
    grid-template-columns: 1fr 2fr;
    grid-template-areas: 'tabs content';
    padding-left: 1rem;
    padding-right: 1rem;
    img{width: 100%; height: 200px;}
    p{&:hover{cursor: pointer;}}
`;

const Content = styled.div`
    padding-left: 1rem;
    padding-right: 1rem;
    grid-area: content;
    position: sticky;
    height: min-content;
    width: 100%;
    top: 1rem;
`;