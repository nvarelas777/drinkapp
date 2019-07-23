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
                <Navbar>
                    <NavLinkStyled  to='/login' className="nav-link" >Login</NavLinkStyled >
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

const NavLinkStyled = styled(NavLink)`
  color: black;
  font-weight: bold;
  padding-left:.6em;
  padding-right:.6em;
  padding-top:.3em;
  font-family: Arial, Helvetica, sans-serif;
`