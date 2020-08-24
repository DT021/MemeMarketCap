import React from 'react';
import styled from 'styled-components';
import _ from "lodash";
import { opp, primary } from '../../../../styles';
import { useStoreState, useStoreActions } from '../../../../store/store';
import { btn } from './FeedbarData';

export const NavBtns = ({ navbtns }: { navbtns: btn[]}) => {
    const { feed } = useStoreState(state => state.active);
    const currentFeed = feed
    const { setFeed } = useStoreActions(actions => actions.active);
    return _.map(navbtns, ({ display, feed }) => {
        return <>
            <FeedbarBtnStyle key={display} feed={feed} currentFeed={currentFeed} setFeed={setFeed}>
                {display}
            </FeedbarBtnStyle>
        </>
    });
};
interface FeedbarBtnInput {
    feed: string;
    currentFeed: string;
    setFeed: CallableFunction;
}

const FeedbarBtnStyle = styled.li.attrs<FeedbarBtnInput>(
    props => ({
        onClick: (_: any) => props.setFeed(props.feed)
    })
)<FeedbarBtnInput>`
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${opp};
    height: 100%;
    font-size: 1.3rem;
    padding-right: 2rem;
    padding-left: 2rem;
    transition: all 0.3s ease-in-out;
    &:hover{ border-bottom: solid 2px ${opp}; font-weight: bold; cursor: pointer;}
    ${props => {
        return props.currentFeed === props.feed ? `
            font-weight: bold;
            border-bottom: solid 2px ${primary};
            &:hover{ border-bottom: solid 2px ${primary}; font-weight: bold; cursor: pointer;}
        ` : ""
    }}
`;