import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { CloseModal } from '../../../utils/CloseModal';
import { useLoginMutation, MeDocument } from '../../../../generated/graphql';
import { useStoreActions } from '../../../../store/store';

export const LoginModal = () => {
    const { setAuthState } = useStoreActions(actions => actions.auth);
    const [ loginUser ] = useLoginMutation();
    const [ formData, setFormData ] = useState({ email: '', password: '' });
    const { email, password } = formData;
    const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData(
        {
            ...formData,
            [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
        }
    );
    const onLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const { data } = await loginUser({
            variables: { email, password },
            update: (store, { data }) => {
                if(!data) return null;
                store.writeQuery({ query: MeDocument, data:{ me: data.login.user } });
            }
        });
        if (data) {
            const { login: { accessToken } } = data;
            setAuthState(accessToken);
        }
    };
    return (
        <div className="modal fade" id="loginModal" tabIndex={-1} role="dialog"
            aria-labelledby="loginModalLabel" aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content modal-body">
                    <LoginContainer>
                        <CloseModal />
                        <LoginTop>
                            <img src="/dist/img/main-logo.png" alt=""/>
                        </LoginTop>
                        <form className='form'>
                            <div className="form-group">
                                <EmailInput value={email} onChange={onChange} required />
                            </div>
                            <div className="form-group">
                                <PasswordInput value={password} onChange={onChange} />
                            </div>
                        </form>
                        <LoginFooter>
                            <LoginBtn onClick={onLogin} data-dismiss="modal">
                                Login
                            </LoginBtn>
                            <NeedAcct />
                        </LoginFooter>
                    </LoginContainer>
                </div>
            </div>
        </div>
    );
}

const NeedAcct = () => {
    return (
        <small className="form-text text-muted" >
            Need an acct?
            <p data-toggle="modal" data-dismiss="modal" data-target="#registerModal">
                Sign Up
            </p>
        </small>
    );
};

const EmailInput = styled.input.attrs(() => ({
    className: "form-control",
    name: 'email',
    type: 'email',
    placeholder: 'Email Address',
}))``;

const PasswordInput = styled.input.attrs(() => ({
    className: "form-control",
    name: 'password',
    type: 'password',
    placeholder: 'Password',
    minLength: '6'
}))``;

const LoginBtn = styled.button.attrs(() => ({
    type: "button",
    className: "btn btn-secondary"
}))``;

const LoginContainer = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    margin-right: 1rem;
    .close{align-self: flex-end;}
`;

const LoginTop = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    img{width: 50%;}
`;

const LoginFooter = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 1;
    align-items: center;
    small{display: flex; margin-top: 0.5rem;}
    p{color: $primary; margin-left: 0.2rem; &:hover{cursor: pointer; font-weight: bold;}}
    button{width: 100%;}
`;