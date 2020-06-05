import React from 'react';
import styled from 'styled-components';
import _ from "lodash";
import { useStoreActions } from 'easy-peasy';
import { offset, opp } from '../../../../styles';

export const TopTable = ({ data }) => {
    const { setData } = useStoreActions(actions => actions.modalState);
    let counter = 0;
    const tableRows = data
        ?_.map(data, item => {counter++;
            const { author, final_score } = item;
            return (
                <TableRow onClick={_ => setData(item)} data-toggle="modal" data-target="#redditTopTableModal" >
                    <th scope="row">{counter}</th>
                    <td>{author}</td>
                    <td>{final_score}</td>
                </TableRow>
            )
        })
        :<></>;
    return (
        <FinalsTable>
            <thead>
                <TableRow>
                    <th scope="col">#</th>
                    <th scope="col">Author</th>
                    <th scope="col">Final Score</th>
                </TableRow>
            </thead>
            <tbody data-toggle="tooltip" data-placement="top" title="Click For More Stats!">
                {tableRows}
            </tbody>
        </FinalsTable>
    );
};

const TableRow = styled.tr`
    background-color: ${offset};
    color: ${opp};
`;

const FinalsTable = styled.table.attrs(props => ({
    className: "table table-dark table-hover"
}))`
    &:hover{cursor: pointer;}
`;