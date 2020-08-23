import React, { useState, useEffect } from 'react';
import { useStoreState } from 'easy-peasy';
import { Memehub } from './components/memehub/MemeHub';
import { MMC } from './components/mmc/MMC';
import { ComingSoon } from './components/utils/ComingSoon';



export const PageHook = (): JSX.Element => {
    const page  = useStoreState(state => state.active.page)
    const [Page, setPage] = useState(<></>);

    useEffect((): void => {
        switch (page) {
            case "memehub": setPage(<Memehub />); break;
            case "mmc": setPage(<MMC />); break;
            default: setPage(<ComingSoon />); break;
        }
    }, [page]);

    return <>{Page}</>
};