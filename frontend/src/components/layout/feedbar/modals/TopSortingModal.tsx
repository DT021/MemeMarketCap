import React from 'react';
import styled from 'styled-components';
import _ from "lodash";
import { CloseModal } from '../../../utils/CloseModal';
import { intoModal } from '../../../utils/intoModal';
import { useStoreState, useStoreActions } from '../../../../store/store';
import { time } from '../../../../store/sorting';

export const TopSortingModal = () => {
    const { time, ordering } = useStoreState(store => store.sorting);
    const { o1, d1, o2, d2 } = ordering;
    const { setTime, setOrdering } = useStoreActions(actions => actions.sorting);
    return intoModal(
        <>
            <CloseModal />
            <Logo><img src="/dist/img/main-logo.png" alt=""/></Logo>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <SelectorLabel htmlFor="time-selector">Time</SelectorLabel>
                </div>
                <Selector value={time} onChange={e => setTime(e.target.value as time)} >
                    <TimeOptions />
                </Selector>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <SelectorLabel htmlFor="order1-selector">Sort 1</SelectorLabel>
                </div>
                <Selector value={o1} onChange={e => setOrdering({key: "o1", value: e.target.value})} >
                    <SortOptions />
                </Selector>
                <div className="input-group-append">
                    <Selector value={d1} onChange={e => setOrdering({key: "d1", value: e.target.value})} >
                        <OrderOptions />
                    </Selector>
                </div>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <SelectorLabel htmlFor="order2-selector">Sort 2</SelectorLabel>
                </div>
                <Selector value={o2} onChange={e => setOrdering({key: "o2", value: e.target.value})} >
                    <SortOptions />
                </Selector>
                <div className="input-group-append">
                    <Selector value={d2} onChange={e => setOrdering({key: "d2", value: e.target.value})} >
                        <OrderOptions />
                    </Selector>
                </div>
            </div>
        </>,
        "topSortingModal"
    );
};

const TimeOptions = () => {
    return <>
        {
            _.map(
                ["Daily", "Weekly", "Monthly", "Ever"],
                time => <option key={time} value={time}>{time}</option>
            )
        }
    </>
};

const SortOptions = () => {
    return <>
        {
            _.map(
                [["percent", "Percent"], ["ups", "Upvotes"], ["downs", "Downvotes"]],
                ([value, display]) => { return <option key={value} value={value}>{display}</option>; }
            )
        }
    </>
};

const OrderOptions = () => {
    return <>
        {
            _.map(
                [["ASC", "Ascending"],["DESC", "Descending"]],
                ([ value, display ])  => { return <option key={value} value={value}>{display}</option>; }
            )
        }
    </>
};

const Logo = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    img{width: 50%;}
`;

const Selector = styled.select.attrs(props => ({
    className: "custom-select",
    value: props.value
}))``;

const SelectorLabel = styled.label.attrs(props => ({
    className: "input-group-text",
}))``;