import React, { Component } from 'react';
import { Route, NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import Login from './login.component.js';
import Navbar from 'react-bootstrap/Navbar';

export default class Footer extends Component {

    render() {
        return (
            <ContainerStyled>
                <h1>test</h1>
                <Navbar>
                    <NavLink to='/login' className="nav-link" >Login</NavLink>
                </Navbar>
                <Route path='/login' component={Login} />
            </ContainerStyled>
        )
    }
}

const ContainerStyled = styled(Container)`
    background-color: #ff6655;
    padding-top:0;
    margin-top: 0;
`;