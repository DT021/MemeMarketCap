import React from 'react';
import _ from "lodash";
import { theme, opp } from '../../styles';
import { ActionCreator } from 'easy-peasy';
import styled from 'styled-components';
import { useStoreState, useStoreActions } from '../../store/store';

export const timesFrames = ["Daily", "Weekly", "Monthly", "Ever"];

export const TimeHandler = () => {
    const { time } = useStoreState(state => state.sorting);
    const setTime = useStoreActions(actions => actions.sorting.setTime);
    return (
        <li>
            <TimeDropdownStyle setTime={setTime} time={time}>
                {_.map(timesFrames, choice => <option key={choice} value={choice}>{choice}</option>)}
            </TimeDropdownStyle>
        </li>
    );
};

interface setTimeModel {
    readonly setTime: ActionCreator<string>;
    readonly time: string;
}

const TimeDropdownStyle= styled.select.attrs<setTimeModel>(
    ({ setTime, time }) => ({
        onChange: (e: Event) => setTime((e.target! as HTMLInputElement).value!),
        value: time
    })
)<setTimeModel>`
    background-color: ${theme};
    border: none;
    color: ${opp};
    &:hover{cursor: pointer;}
`;