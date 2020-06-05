import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useStoreState } from 'easy-peasy';
import { useMeQuery } from '../../../../generated/graphql';

export const RegisterBtn = () => {
    const { isAuthenticated } = useStoreState(state => state.auth);
    const { data, loading } = useMeQuery();
    const [registerBtn, setRegisterBtn] = useState(<></>);
    useEffect(() => {
        if(isAuthenticated){
            if(!loading && data && data.me) setRegisterBtn(<img src={data.me.avatar} alt=""/>);
            else setRegisterBtn(<></>);
        }else{
            setRegisterBtn(
                <div data-toggle="modal" data-target="#registerModal">
                    <AuthBtn>Register</AuthBtn>
                </div>
            );
        };
    }, [data, loading, isAuthenticated]);
    return registerBtn;
};

const AuthBtn = styled.p`
    height: 100%;
    display: flex;
    align-items: center;
    border: solid 1px
    transparent; border-radius: 10%;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    transition: all 0.2s ease-in;
    &:hover{cursor: pointer; border: solid 1px #333;}
`;