import React, { useState } from 'react';
import { AuxFeed } from '../auxFeed/AuxFeed';
import { useTopMemesMutation } from '../../generated/graphql';
import useAsyncEffect from 'use-async-effect';
import styled from 'styled-components';
import { Meme } from './meme/Meme';
import _ from "lodash";
import { theme } from '../../styles';
import { ComingSoon } from '../utils/ComingSoon';
import { timeToDays, EvenIdx, OddIdx } from './utils/functions';
import { useStoreState } from '../../store/store';

export interface Memes {
    username: string;
    memeId: number;
    ups: number;
    downs: number;
    percent: number;
    commentCount: number;
    createdAt: Date;
    url: string;
}

export const Memehub = () => {
    const { feed } = useStoreState(state => state.active);
    const { mosaic, time, ordering, offset } = useStoreState(state => state.sorting);
    const [memes, setMemes] = useState<Memes[]>([]);
    const [loading, setLoading] = useState(false);
    const [getTopMemes] = useTopMemesMutation();
    const TopQuery = {variables:{
        days: timeToDays[time],
        ordering,
        offset
    }}

    useAsyncEffect(async () => {
        switch (feed) {
            case "top":
                setLoading(true);
                const { data } = await getTopMemes(TopQuery);
                if(data) {
                    const { topMemes }: { topMemes: Memes[] } = data
                    setMemes(topMemes);
                }
                break;
            default:
                setLoading(false);
                setMemes([]);
                break;
        }
    }, [setMemes, setLoading, time, ordering, offset, feed]);
    
    if(!memes && !loading) return <ComingSoon />;
    if(!memes && loading) return <></>;
    if (mosaic) {
        const MemeCol1 = () => <>
            {
                _.map(
                    _.filter(memes, EvenIdx),
                    data => <Meme key={data.memeId} data={data} />
                )
            }
        </>
        const MemeCol2 = () => <>
            {
                _.map(
                    _.filter(memes, OddIdx),
                    data => <Meme key={data.memeId} data={data} />
                )
            }
        </>
        return (
            <MosaicGrid>
                <Main><MemeCol1 /></Main>
                <Main2><MemeCol2 /></Main2>
                <AuxFeed />
            </MosaicGrid>
        );
    } else {
        return (
            <SingleGrid>
                <Main>{_.map(memes, data => <Meme key={data.memeId} data={data} />)}</Main>
                <AuxFeed />
            </SingleGrid>
        );
    };
};

const MosaicGrid = styled.div`
    display: grid;
    grid-area: feed;
    grid-template-columns: 4fr 4fr 3fr;
    grid-template-areas:
        'feed-main feed-main2 aux';
    overflow: auto;
    background-color: ${theme};
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 2rem;
    padding-right: 2rem;
    img { &:hover{cursor: pointer;} }
`;

const SingleGrid = styled.div`
    display: grid;
    grid-area: feed;
    grid-template-columns: 8fr 3fr;
    grid-template-areas:
        'feed-main aux';
    overflow: auto;
    background-color: ${theme};
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 2rem;
    padding-right: 2rem;
    img { &:hover{cursor: pointer;} }
`;

const Main = styled.div`
    grid-area: feed-main;
    padding: 1rem;
    img{width: 100%;}
`;

const Main2 = styled.div`
    grid-area: feed-main2;
    padding: 1rem;
`;

