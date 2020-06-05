import React from 'react';
import _ from 'lodash';

export const TableHeadersData = [
    [
        ["Final Score", "Final"],
        ["Relative Highest Upvotes Score", "HU Score"],
        ["Lowest Upvotes to Downvotes Ratio", "LU Ratio"]
    ],
    [
        ["# Memes in Top 1% of # of Upvotes", "Top 1%"],
        ["# Memes in Bottom 99% of # of Upvote", "Bottom 99%"],
        ["Shitposter Index", "SI"]
    ]
]

export const TableHeader = (title, text) => (
    <th scope="col"
        data-toggle="tooltip"
        data-placement="top"
        title={title}
    >{text}</th>
);

export const createTableHeaders = headers => _.map(headers, ([ title, text ]) => TableHeader(title, text));