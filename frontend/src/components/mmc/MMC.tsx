import React, { useState, useEffect } from 'react';
import { AuxFeed } from '../auxFeed/AuxFeed';
import { Overview } from './overview/Overview';
import { Reddit } from './reddit/Reddit';
import { StandardGridAux, MainContent } from '../../styles';
import { ComingSoon } from '../utils/ComingSoon';
import { useStoreActions, useStoreState } from '../../store/store';

export const MMC = () => {
    const feed = useStoreState(state => state.active.feed);
    const { setTab } = useStoreActions(actions => actions.active);
    const [main, setMain] = useState(<ComingSoon />);
    useEffect(() => {
        switch (feed) {
            case "overview":
                setMain(<Overview />);
                break;
            case "reddit":
                setMain(<Reddit />);
                setTab("dankmemes");
                break;
            default:
                setMain(<ComingSoon />);
                break;
        };
    }, [feed, setTab]);
    return <StandardGridAux>{main}<AuxFeed /></StandardGridAux>;
};