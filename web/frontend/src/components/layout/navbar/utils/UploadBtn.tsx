import React from 'react';
import styled from 'styled-components';
import { useStoreState } from 'easy-peasy';

export const UploadBtn = () => {
    const { isAuthenticated } = useStoreState(state => state.auth)
    return isAuthenticated
        ?<UploadIconWrapper>
            <div data-toggle="modal" data-target="#uploadModal" ><UploadIcon /></div>
        </UploadIconWrapper>
        : <></>;
};

const UploadIconWrapper = styled.div`
    flex-grow: 1;
    justify-self: start;
    align-self: center;
`;

const UploadIcon = styled.i.attrs(() => ({
    className: "fal fa-cloud-upload fa-2x",
    dataToggle: "tooltip",
    dataPlacement: "bottom",
    title: "Meme Upload"
}))``;