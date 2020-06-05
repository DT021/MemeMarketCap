import styled from 'styled-components';

export const primary = "#17a2b8";
export const theme = "#000";
export const offset = "#222";
export const opp = "#f4f4f4";
export const danger = "#dc3545";
export const success = "#28a745";
export const maxWidth = "2100px";

export const StandardGridAux = styled.div`
    display: grid;
    grid-area: feed;
    grid-template-columns: 8fr 3fr;
    grid-template-areas:
        'main aux';
    overflow: auto;
    background-color: $theme;
    padding-top: 0;
    padding-bottom: 0;
    padding-left: 2rem;
    padding-right: 2rem;
`;

export const MainContent = styled.div`
    grid-area: main;
    margin-top: 1rem;
`;