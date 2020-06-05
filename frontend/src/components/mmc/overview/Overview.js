import React from 'react'
import styled from 'styled-components';

export const Overview = () => {
    return (
        <MMCOverview>
            <div className="container" data-toggle="modal" data-target="#totalsChart">
                <img src="/dist/img/TotalsChartModalButton.jpg" alt=""/>
                <ChartModalLabel>
                    Totals
                </ChartModalLabel>
            </div>
            <div className="container" data-toggle="modal" data-target="#pcChart">
                <img src="https://i.imgflip.com/1gy24y.jpg" alt=""/>
                <ChartModalLabel>
                    Percentage Change
                </ChartModalLabel>
            </div>
        </MMCOverview>
    )
}

const MMCOverview = styled.div.attrs(props => ({
    className: "text-center"
}))`
    display: grid;
    grid-area: main;
    grid-template-columns: 1fr 1fr;
    padding: 1rem;
    img{width: 100%; height: 200px;}
    p{&:hover{cursor: pointer;}}
`;

const ChartModalLabel = styled.p`
    padding: 1rem;
    font-size: 1.3rem;
`;