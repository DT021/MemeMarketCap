import React from 'react';
import styled from 'styled-components';
import { useStoreState } from 'easy-peasy';
import { CloseModal } from '../../../utils/CloseModal';
import { intoModal } from '../../../utils/intoModal';
import { offset, opp } from '../../../../styles';
import { TableHeadersData, createTableHeaders } from '../utils/TableHeader';

export const RedditTopTableModal = () => {
    const { data } = useStoreState(state => state.modalState);
    const {
        author, final_score, num_in_bottom, num_in_top, shitposter_index,
        hu_score, lowest_ratio, sub, media
    } = data
    const TableData = [
        [final_score, hu_score, lowest_ratio],
        [num_in_top, num_in_bottom, shitposter_index]
    ];
    const StatsTable = ({ num }) => (
        <StatsTableStyle>
            <thead>
                <TableRow>
                    {createTableHeaders(TableHeadersData[num])}
                </TableRow>
            </thead>
            <tbody>
                <TableRow>
                    <td>{TableData[num][0]}</td>
                    <td>{TableData[num][1]}</td>
                    <td>{TableData[num][2]}</td>
                </TableRow>
            </tbody>
        </StatsTableStyle>
    );

    const content = (
        <>
            <div className="container-fluid">
                <CloseModal />
                <TitleStyle>{author} - {sub}</TitleStyle>
                <MemeStyle><img src={media} width="100%" alt=""/></MemeStyle>
            </div>
            <StatsTable num={0} />
            <StatsTable num={1} />
        </>
    )
    return intoModal(content, "redditTopTableModal")
};

const TitleStyle = styled.p`font-size: 1.3rem;`;
const MemeStyle = styled.p`margin-bottom: 1rem;`;

const StatsTableStyle = styled.table.attrs(props => ({
    className: "table table-dark table-hover text-center"
}))`
    &:hover{cursor: pointer;}
`;

const TableRow = styled.tr`
    background-color: ${offset};
    color: ${opp};
`;