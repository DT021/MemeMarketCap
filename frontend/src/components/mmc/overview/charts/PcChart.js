import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useStoreState } from 'easy-peasy';
import { useLoadRedbMutation } from '../../../../generated/graphql';
import { TimeHandler } from '../../../utils/TimeHandler';
import useAsyncEffect from 'use-async-effect';
import { CloseModal } from '../../../utils/CloseModal';
import { OverviewQuery } from '../../utils/redb';
import { intoModal } from '../../../utils/intoModal';

export const PcChart = () => {
    const { time } = useStoreState(state => state.sorting);
    const [redbql] = useLoadRedbMutation();
    const [totals, setTotals] = useState(null);
    useAsyncEffect(async () => {
        const { data } = await redbql(OverviewQuery);
        setTotals(JSON.parse(data.redb).totals);
    }, [redbql]);
    if(!totals) return intoModal(<></>, "pcChart");
    const { labels, datasets } = data;
    totals[time].forEach(item => { labels.push(item.sub); datasets[0].data.push(item.percent); });
    options.tooltips.callbacks = {
        title: function(tooltipItem, data) { return data['labels'][tooltipItem[0]['index']]; },
        label: function(tooltipItem, data) { return data['datasets'][0]['data'][tooltipItem['index']] + '%'; }
    }
    return intoModal(
        <div className="container-fluid">
            <CloseModal />
            <TimeHandler />
            <Bar data={data} options={options} height={250} />
        </div>
    
    , "pcChart");
};

let data = {
    labels: [],
    datasets:[{
        label:'Percent Change',
        data: [],
        backgroundColor:'#444',
        hoverBackgroundColor: 'rgb(23, 162, 184)'
    }]
};

let options = {
    title:{
        display:true,
        text:'Memes Posted',
        fontSize:25,
        fontColor:'#fff'
    },
    legend:{display:false},
    tooltips: {
        backgroundColor: '#111',
        width: 10,
        titleFontSize: 16,
        titleFontColor: '#fff',
        bodyFontColor: '#fff',
        bodyFontSize: 14,
        displayColors: false,
    }
};