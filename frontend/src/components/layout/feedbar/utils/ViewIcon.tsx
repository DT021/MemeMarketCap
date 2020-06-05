import React from 'react'
import styled from 'styled-components';
import { primary } from '../../../../styles';
import { useStoreState } from '../../../../store/store';

export const ViewIcon = () => {
    const { mosaic } = useStoreState(state => state.sorting);
    return mosaic
        ? <i className='fal fa-th-large fa-lg' />
        : <SingleViewIconStyle>
            <i className='fal fa-rectangle-wide fa-sm' />
            <i className='fal fa-rectangle-wide fa-sm' />
        </SingleViewIconStyle>;
};

const SingleViewIconStyle = styled.div`
    display: flex;
    flex-direction: column;
    font-size: .9rem;
    &:hover{i{ transition: all .3s ease-in-out; color:${primary};}}
`;