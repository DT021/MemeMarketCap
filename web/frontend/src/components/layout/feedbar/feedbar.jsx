import React, { useEffect, useState} from 'react'
import styled from 'styled-components';
import { feedbardata } from './utils/FeedbarData';
import { theme, offset, } from '../../../styles';
import { NavBtns } from './utils/NavBtns';
import { Mosaic } from './utils/Mosaic';
import { useStoreState } from '../../../store/store';

export const Feedbar = () => {
    const page = useStoreState(state => state.active.page);
    const [navbtns, setNavbtns] = useState([]);
    const [hasMosaic, setHasMosaic] = useState(false);
    useEffect(() => {
        const { btns, hasMoTog } = feedbardata(page);
        setNavbtns(btns);
        setHasMosaic(hasMoTog);
    }, [page]);
    return (
        <FeedbarStyle>
            <FeedbarBtnsStyle>
                <NavBtns navbtns={navbtns} />
            </FeedbarBtnsStyle>
            <TimeViewStyle>
                <Mosaic hasMosaic={hasMosaic} />
                <SortingIcon data-toggle="modal" data-target="#topSortingModal" />
            </TimeViewStyle>
        </FeedbarStyle>
    );
};

const FeedbarStyle = styled.nav`
    grid-area: feedbar;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    background-color: ${theme};
    border-bottom: solid 1px ${offset};
    margin-left: 2rem;
    margin-right: 3rem;
`;

const FeedbarBtnsStyle = styled.ul`
    height: 100%;
    display: flex;
    margin: 0;
`;

const TimeViewStyle = styled.ul`
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
    margin: 0;
    margin-right: 2rem;
`;

const SortingIcon = styled.i.attrs(() => ({
    className: "fal fa-sort-size-up-alt fa-lg"
}))``;