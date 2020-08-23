import { useStoreActions } from '../../../../store/store';
import React from 'react';
import styled from 'styled-components';
import { ViewIcon } from './ViewIcon';

export const Mosaic = ({ hasMosaic }: { hasMosaic: boolean}) => {
    const { toggleMosaic } = useStoreActions(actions => actions.sorting);
    return hasMosaic
        ? <ViewStyle>
            <span onClick={e => toggleMosaic()}>
                <ViewIcon />
            </span>
        </ViewStyle>
        : <></>
};

const ViewStyle = styled.li`
    margin-right: 1.5rem;
    margin-left: 1rem;
`;