import React from 'react';
import styled from 'styled-components';
import { MemeLeagueMemeData } from './seed';

export const MemeLeague = ({ data: { url, season, round } }: { data: MemeLeagueMemeData }) => {
    const title = `Season ${season} - Round ${round}`;
    return (
        <MemeShortStyle>
            <img src={url} width="100%" alt="" />
            <MemeVotes>
                <i className="fas fa-arrow-down meme-downvote"></i>
                <i className='fal fa-swords fa-lg'
                    data-toggle="tooltip" data-placement="top" title={title}
                />
                <i className="fas fa-arrow-up meme-upvote"></i>
            </MemeVotes>
        </MemeShortStyle>
    )
};

const MemeShortStyle = styled.div.attrs(() => ({
    dataToggle: "modal",
    dataTarget: "#leagueModal",
}))`
    display: grid;
    grid-template-rows: 1fr 6vh;
    border-radius: 3%;
    margin-bottom: 1rem;
`;

const MemeVotes = styled.div`
    display: flex; justify-content: space-around; align-items: center;
    margin-top: 0.3rem; padding-bottom: 0.3rem;
`;