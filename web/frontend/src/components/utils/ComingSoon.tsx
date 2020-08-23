import React from 'react';
import { AuxFeed } from "../auxFeed/AuxFeed";
import { StandardGridAux, MainContent } from '../../styles';

export const ComingSoon = () => {
    return(
        <StandardGridAux>
            <MainContent>
                <img src="/dist/img/coming-soon.jpg" alt=""/>
            </MainContent>
            <AuxFeed />
        </StandardGridAux>
    )
};