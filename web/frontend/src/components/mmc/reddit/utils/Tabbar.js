import React from 'react';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from 'easy-peasy';
import _ from "lodash";
import { opp, theme, primary } from '../../../../styles';
const tabBtns = ["dankmemes", "memes", "memeEconomy", "wholesomememes", "HistoryMemes", "DeepFriedMemes", "lotrmemes"];

export const Tabbar = () => {
    const { tab } = useStoreState(state => state.active);
    const { setTab } = useStoreActions(actions => actions.active);
    const TabBtns = _.map(tabBtns, btn => {
        return (
            <TabOption active={tab===btn} onClick={_=>setTab(btn)} >
                    <i className="fad fa-circle"></i>
                    <TabLabel>{btn}</TabLabel>
            </TabOption>
        )
    });
    return (
        <TabsStyle>
            {TabBtns}
        </TabsStyle>
    );
};

const TabsStyle = styled.ul`
    grid-area: tabs;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    background-color: #222;
    position: sticky;
    height: min-content;
    width: 100%;
    top: 1rem;
`;

const TabOption = styled.li`
    ${props => {
        return props.active ? `
            font-weight: bold;
            background-color: ${theme};
            i{
                color: ${primary};
            }
        ` : `
            i{
                color: ${opp};
            }
        `
    }}
    width: 100%;
    transition: all 0.3s ease-in-out;
    display: flex;
    align-items: center;
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    padding-left: 1rem;
    i{
        margin-right: 0.5rem;
    }
    &:hover {
        font-weight: bold;
        background-color: ${theme};
        cursor: pointer;
    }
`;

const TabLabel = styled.div`
    color: ${opp}
`;