import React from 'react'
import { LoginModal } from './layout/navbar/modals/LoginModal';
import { RegisterModal } from './layout/navbar/modals/RegisterModal';
import { MemehubModal } from './memehub/meme/MemeModal';
import { LeagueModal } from './auxFeed/LeagueModal';
import { UploadModal } from './layout/navbar/modals/UploadModal';

import { PcChart } from './mmc/overview/charts/PcChart';
import { TotalsChart } from './mmc/overview/charts/Totals';
import { RedditTopTableModal } from './mmc/reddit/modals/RedditTableModal';
import { TopSortingModal } from './layout/feedbar/modals/TopSortingModal';

export const RootModal = ()  => {
    return (
        <>
            <LoginModal />
			<RegisterModal />
			<MemehubModal />
			<LeagueModal />
			<UploadModal />
            <PcChart />
            <TotalsChart />
            <RedditTopTableModal />
            <TopSortingModal />
        </>
    )
}
