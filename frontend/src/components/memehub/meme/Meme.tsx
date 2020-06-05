import React from 'react';
import moment from 'moment';
import styled from 'styled-components';
import { opp } from '../../../styles';
import { toGrade } from '../utils/functions';
import { useStoreActions } from '../../../store/store';

interface MemeData {
    username: string;
    createdAt: Date;
    url: string;
    ups: number;
    downs: number;
    percent: number;
}

export const Meme = ({ data }: {data: MemeData}) => {
    const { username, createdAt, url, ups, downs, percent } = data;
    const { setData } = useStoreActions(actions => actions.modal);
    const date = moment(createdAt).toDate();
    const fromNow = moment(createdAt).fromNow()
    return (
        <MemeStyle>
            <MemeTopStyle>
                <MemeTitleStyle>{username}</MemeTitleStyle>
                <MemeTimeStyle date={date}>{fromNow}</MemeTimeStyle>
            </MemeTopStyle>
            <div onClick={_ => setData(data)} data-toggle="modal" data-target="#memehubModal">
                <img src={url} width="100%" alt="" />
            </div>
            <MemeVotesStyle>
                <div data-toggle="tooltip" data-placement="top" title={`${downs}`}>
                    <i className="fas fa-arrow-down"> {downs}</i>
                </div>
                <MemePercentStyle score={percent}> {toGrade(percent)} </MemePercentStyle>
                <div data-toggle="tooltip" data-placement="top" title={`${ups}`}>
                    <i className="fas fa-arrow-up"> {ups}</i>
                </div>
            </MemeVotesStyle>
        </MemeStyle>
    )
};

const MemeStyle = styled.div`
    display: grid;
    grid-template-rows: 6vh 1fr 6vh;
    margin-bottom: 1rem; 
`;

const MemeTopStyle = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const MemeTitleStyle = styled.div`
    color: ${opp};
    margin-left: 1rem;
`;

const MemeTimeStyle = styled.div.attrs<{date: Date}>(
    ({ date }) => ({
        dataToggle:"tooltip",
        dataPlacement: "top",
        title: date
    })
)<{date: Date}>`
    color: ${opp};
    margin-right: 1rem;
    &:hover{cursor: pointer;}
`;

const MemeVotesStyle = styled.div`
    display: flex;
    justify-content: space-around;
    height:100%;
    align-self:center;
    align-items: center;
    padding-top: 0.3rem;
    padding-bottom: 0.3rem;
`;

const MemePercentStyle = styled.div.attrs<{score: number}>(
    ({ score }) => ({
        dataToggle:"tooltip",
        dataPlacement: "top",
        title: score
    })
)<{score: number}>`
    display:flex;
    align-items: center;
    font-size: 1.3rem;
    color: ${opp};
    &:hover{cursor: pointer;}
    font-weight: 1.3rem;
`;