import React, { useState, ChangeEvent } from 'react';
import styled from 'styled-components';
import { useRegisterMutation, MeDocument } from '../../../../generated/graphql';
import { CloseModal } from '../../../utils/CloseModal';
import { useStoreActions } from '../../../../store/store';

export const RegisterModal = () => {
    const { setAuthState } = useStoreActions(actions => actions.auth);
    const [ registerUser ] = useRegisterMutation();
    const [ formData, setFormData ] = useState({ username: '', email: '', password: '', password2: '' });
    const { username, email, password, password2 } = formData;
    const onChange = (e: ChangeEvent<HTMLInputElement>) => setFormData({
        ...formData,
        [(e.target as HTMLInputElement).name]: (e.target as HTMLInputElement).value
    });
    const onSubmit = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        if (password === password2) {
            const { data } = await registerUser({
                variables: { username, email, password },
                update: (store, { data }) => {
                    if(!data) return null;
                    store.writeQuery({ query: MeDocument, data: { me: data.register.user } });
                }
            });
            if(data){
                const { register: { accessToken } } = data
                setAuthState(accessToken);
            }
        }
    };
    return (
        <div className="modal fade" id="registerModal" tabIndex={-1} role="dialog"
            aria-labelledby="registerModalLabel" aria-hidden="true"
        >
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content modal-body">
                    <RegisterContainter>
                        <CloseModal />
                        <RegisterTop><img src="/dist/img/main-logo.png" alt=""/></RegisterTop>
                        <form className='form'>
                            <div className="form-group">
                                <UsernameInput value={username} onChange={onChange} />
                            </div>
                            <div className="form-group">
                                <EmailInput value={email} onChange={onChange} />
                            </div>
                            <div className="form-group">
                                <PasswordInput value={password} onChange={onChange} />
                            </div>
                            <div className="form-group">
                                <ConfirmPasswordInput value={password2} onChange={onChange} />
                            </div>
                        </form>
                        <RegisterFooter>
                            <RegisterBtn data-dismiss="modal" onClick={onSubmit}>
                                Sign Up
                            </RegisterBtn>
                            <HaveAcct />
                        </RegisterFooter>
                    </RegisterContainter>
                </div>
            </div>
        </div>
    );
};

const HaveAcct = () => {
    return (
        <small className="form-text text-muted">
            Already have an acct?
            <p data-toggle="modal" data-dismiss="modal" data-target="#loginModal">
                Login
            </p>
        </small>
    );
};

const UsernameInput = styled.input.attrs(() => ({
    className: "form-control",
    name: 'username',
    type: 'text',
    placeholder: 'Username'
}))``;

const EmailInput = styled.input.attrs(() => ({
    className: "form-control",
    name: 'email',
    type: 'email',
    placeholder: 'Email Address'
}))``;

const PasswordInput = styled.input.attrs(() => ({
    className: "form-control",
    name: 'password',
    type: 'password',
    placeholder: 'Password'
}))``;

const ConfirmPasswordInput = styled.input.attrs(() => ({
    className: "form-control",
    name: 'password2',
    type: 'password',
    placeholder: 'Confirm Password'
}))``;

const RegisterBtn = styled.button.attrs(() => ({
    className: "btn btn-secondary",
    type: "button"
}))``;

const RegisterContainter = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    margin-right: 1rem;
    .close{align-self: flex-end;}
`;

const RegisterTop = styled.div`
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;
    img{width: 50%;}
`;

const RegisterFooter = styled.div`
    display: flex;
    flex-direction: column;
    flex-basis: 1;
    align-items: center;
    small{display: flex; margin-top: 0.5rem;}
    p{color: $primary; margin-left: 0.2rem; &:hover{cursor: pointer; font-weight: bold;}}
    button{width: 100%;}
`;