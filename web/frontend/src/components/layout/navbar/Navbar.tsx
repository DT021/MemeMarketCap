import React from 'react';
import styled from 'styled-components';
import { opp, offset } from '../../../styles';
import { LoginBtn } from './utils/LoginBtn';
import { RegisterBtn } from './utils/RegisterBtn';
import { UploadBtn } from './utils/UploadBtn';

export const  Navbar = () => {
    return (
        <NavbarStyle>
            <NavbarLeftStyle>
                <img src="/dist/img/icon.png" alt=""/>
                <div className="form-group">
                    <SearchBar />
                </div>
                <UploadBtn />
            </NavbarLeftStyle>
            
            <NavbarRightStyle>
                <li><BetaStyle>beta</BetaStyle></li>
                <li><RegisterBtn /></li>
                <li><LoginBtn /></li>
            </NavbarRightStyle>
        </NavbarStyle>
    );
};

const NavbarStyle = styled.nav`
    grid-area: navbar;
    display: flex;
    justify-content: space-between;
    background-color: $theme;
    border-bottom: solid 1px ${offset};
    li { display: flex; padding: 0; } 
`;

const NavbarLeftStyle = styled.ul`
    padding: 0;
    display: flex;
    align-items: center;
    height: 100%;
    margin-left: 1rem;
    img{ height: 70%; width: 9%; }
    input{ height: 60%; margin-left: 0.8rem; }
    .form-group{width: 80%; display: flex; height: 85%; margin: 0; align-items:center;}
`;

const NavbarRightStyle = styled.ul`
    display: flex;
    height: 100%;
    padding-top: .7rem;
    padding-bottom: .7rem;
    margin-right: 1rem;
    > li:last-child{ margin-right: 1rem; }
    img {
        height: 6vh;
        width: 5vh;
        margin-right: 1.5rem;
        margin-left: 1rem;
        border-radius: 5%;
        &:hover{cursor: pointer;}
    }
`;

const SearchBar = styled.input.attrs(() => ({
    className: "form-control",
    type: "text",
    id: "search",
    rows: "1",
    placeholder: 'Search The Library Of Dankness',
    name: 'search'
}))``;

const BetaStyle = styled.p`
    color: ${opp};
    font-style: italic;
    &:hover{ cursor: pointer; }
    height: 100%;
    display: flex;
    align-items: center;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`;