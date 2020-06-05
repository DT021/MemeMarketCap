import React from 'react';
import styled from 'styled-components';
import { v4 as uuidv4 } from 'uuid';
import _ from "lodash";
import moment from 'moment';
import { toGrade } from '../utils/functions';
import { opp } from '../../../styles';

interface CommentData {
    text: string;
    createdAt: Date;
    avatar: string
    ups: number;
    downs: number;
}

export const Comment = ({ data }: {data: CommentData}) => {
    const { text, createdAt, avatar, ups, downs } = data;
    const percent = Math.round(10_000*(ups/(ups+downs) + Number.EPSILON))/100;
    return (
        <div key={uuidv4()} className="row">
            <CommentGrid>
                <CommentInfoStyle>
                    <img src={avatar} alt=""/>
                    <p>{moment(createdAt).fromNow()}</p>
                </CommentInfoStyle>
                <CommentText>{text}</CommentText>
                <CommentVotesStyle>
                    <i className="fas fa-arrow-up"> {ups}</i>
                    <MemePercentStyle percent={percent}>{toGrade(percent)}</MemePercentStyle>
                    <i className="fas fa-arrow-down"> {downs}</i>
                </CommentVotesStyle>
            </CommentGrid>
        </div>
    );
};

const CommentText = styled.p`
    width: 100%;
`;


const CommentGrid = styled.div`
    margin-top: 1rem;
    border-bottom: solid 1px white;
    display: grid;
    grid-template-columns: 8vw auto 3vw;
    width: 100%;
`;

const CommentInfoStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    p{margin-top: 1rem;}
    img{ width: 80%;}
    height: 100%;
`;

const CommentVotesStyle = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    .fa-arrow-down{margin-bottom: 1rem;}
    height: 100%;
`;

const MemePercentStyle = styled.div.attrs<{percent: number;}>(({ percent }) => ({
    dataToggle:"tooltip",
    dataPlacement: "top",
    className: "text-center",
    title: percent
}))<{percent: number;}>`
    display:flex;
    align-items: center;
    justify-content: center;
    font-size: 1.3rem;
    color: ${opp};
    &:hover{cursor: pointer;}
    font-weight: 1.3rem;
`;