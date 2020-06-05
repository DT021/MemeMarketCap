import React from 'react';
import styled from 'styled-components';
import { leftbardata } from './LeftbarData';
import _ from "lodash";
import { offset, theme, primary, opp } from '../../../styles';
import { useStoreState, useStoreActions } from '../../../store/store';

export const Leftbar = () => {
    const currentPage = useStoreState(state => state.active.page)
    const { switchPage } = useStoreActions(actions => actions.active);
    const leftbar = _.map(
        leftbardata,
        ({ page, icon, name }) => {
            return (
                <LeftbarBtnStyle key={page} page={page} currentPage={currentPage} switchPage={switchPage} >
                    <LabelNIcon>
                        <i className={icon} /><span className="hide-sm">{name}</span>
                    </LabelNIcon>
                    <i className="fal fa-chevron-double-left"></i>
                </LeftbarBtnStyle>
            )
        }
    )
    return <LeftbarStyle><BtnList>{leftbar}</BtnList></LeftbarStyle>;
};

const LeftbarStyle = styled.div`
    grid-area: leftbar;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: flex-start;
    border-right: solid 1px ${offset};
    background-color: ${offset};
    width: 100%;
    height: 100%;
    i { margin-right: 1rem; }
`;

const BtnList = styled.ul`
    width: 100%;
    background-color: ${offset};
    &:hover{cursor: pointer;}
`;

interface LeftbarBtnStyle {
    page: string;
    currentPage: string;
    switchPage: CallableFunction;
}

const LeftbarBtnStyle = styled.li.attrs<LeftbarBtnStyle>(props => ({
    onClick: (_: any) => props.switchPage(props.page)
}))<LeftbarBtnStyle>`
    ${props => {
        return props.currentPage === props.page ? `
            font-weight: bold;
            background-color: ${theme};
            i{transition: all 0.3s ease-in-out; font-size: 1.6rem; color: ${primary};}
            .fa-chevron-double-left {transition: all 0.3s ease-in-out; transform: rotate(180deg); color: $primary; font-size: 1rem; }
        ` : `.fa-chevron-double-left {color: ${theme};}`
    }}
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: ${opp};
    width: 100%;
    transition: all 0.3s ease-in-out;
    &:hover {
        font-weight: bold; background-color: ${theme};
        i:first-child {transition: all 0.3s ease-in-out; font-size: 1.6rem; color: ${primary};}
        i:last-child {transition: all 0.3s ease-in-out; color: ${primary};}
    }
`;

const LabelNIcon = styled.div`
    margin-left: 1.5rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
`;