import React, { useState } from 'react';
import _ from "lodash";
import styled from 'styled-components';
import useAsyncEffect from 'use-async-effect';
import { useCommentDataMutation } from '../../../generated/graphql';
import { Comment } from './Comment';
import { offset, opp } from '../../../styles';

export const Comments = ({ memeId }: { memeId: number }) => {
    
    const [getCommentData] = useCommentDataMutation();
    const commentQuery = { variables: { memeId } }
    const [comments, setComments] = useState({})
    useAsyncEffect(async () => {
        if(memeId){
            const { data } = await getCommentData(commentQuery);
            if(data) {
                const { commentData } = data
                setComments(commentData);
            };
        };
    }, [getCommentData, setComments, memeId]);
    if(!comments) return <></>;
    return(
        <>
            <div className="row">
                <CommentInput>
                    <textarea className="form-control" placeholder="Comment Here..." rows={3} />
                    <div className="input-group-append">
                        <CommentBtn>
                            <i className="fal fa-arrow-to-bottom fa-lg" />
                        </CommentBtn>
                    </div>
                </CommentInput>
            </div>
            {_.map(comments, data => <Comment data={data} />)}
        </>
    );
};

const CommentBtn = styled.button.attrs(() => ({
    type: "submit"
}))`
    background-color: ${offset};
    color: ${opp};
`;

const CommentInput = styled.div.attrs(() => ({
    className: "input-group"
}))`
    width: 100%;
    margin: 0;
    padding: 0;
    margin-top: 1rem;
`;