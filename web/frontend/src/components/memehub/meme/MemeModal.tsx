import React from 'react';
import styled from 'styled-components';
import { useStoreState } from 'easy-peasy';
import { Comments } from './Comments'
import { opp } from '../../../styles';
import { CloseModal } from '../../utils/CloseModal';
import { intoModal } from '../../utils/intoModal';
import { toGrade } from '../utils/functions';
import moment from 'moment';

interface modalData {
    username: string;
    url: string;
    memeId: number;
    ups: number;
    downs: number;
    percent: number;
    createdAt: Date;
}

export const MemehubModal = () => {
    const state: { data: modalData } | undefined = useStoreState(state => state.modalState)
    if(!state) return <></>;
    const { data } = state;

    const { username, url, memeId, ups, downs, percent, createdAt } = data
    return intoModal(
        <div className="container-fluid">
            <CloseModal />
            <div className="meme-modal-content">
                <ModalHeader>
                    <MemeAuthor>{username}</MemeAuthor>
                    <MemeTimeStyle title={`${moment(createdAt).toDate()}`}>
                        {moment(createdAt).fromNow()}
                    </MemeTimeStyle>
                </ModalHeader>
                <div className="row">
                    <img src={url} width="100%" alt="" />
                </div>
                <MemeVotesStyle>
                    <div data-toggle="tooltip" data-placement="top" title={`${downs}`}>
                        <i className="fas fa-arrow-down meme-downvote"> {downs}</i>
                    </div>
                    <MemePercentStyle title={`${percent}`}>
                        {toGrade(percent)}
                    </MemePercentStyle>
                    <div data-toggle="tooltip" data-placement="top" title={`${ups}`}>
                        <i className="fas fa-arrow-up meme-upvote"> {ups}</i>
                    </div>
                </MemeVotesStyle>
                
                <Comments memeId={memeId} />
            </div>
        </div>, "memehubModal"
    );
};

const MemeAuthor = styled.p`
    font-size: 1.5rem;
    color: ${opp};
`;

const ModalHeader = styled.div.attrs(props => ({
    className: "row"
}))`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
`;

const MemePercentStyle = styled.div.attrs(props => ({
    dataToggle:"tooltip",
    dataPlacement: "top",
}))`
    display: flex;
    align-items: center;
    font-size: 1.3rem;
    color: ${opp};
    &:hover{cursor: pointer;}
    font-weight: 1.3rem;
`;

const MemeVotesStyle = styled.div`
    display: flex;
    justify-content: space-around;
    height:100%;
    align-self:center;
    align-items: center;
    margin-top: 1rem;
`;

const MemeTimeStyle = styled.p.attrs(() => ({
    dataToggle:"tooltip",
    dataPlacement: "top",
}))`
    color: ${opp};
    margin-right: 1rem;
    &:hover{cursor: pointer;}
`;