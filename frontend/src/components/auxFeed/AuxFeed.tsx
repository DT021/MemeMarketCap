import React from 'react';
import { MemeLeague } from './MemeLeague';
import { seedAux } from './seed';
import _ from "lodash";
import styled from 'styled-components';

export const AuxFeed = () => {
    return (
        <AuxStyle>
            {
                _.map(
                    seedAux,
                    data => <MemeLeague key={data.url} data={data} />
                )
            }
        </AuxStyle>
    );
};

const AuxStyle = styled.div`
    grid-area: aux;
    padding: 1rem;
`;