import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css"
import { BrowserRouter as Router, Route } from "react-router-dom";
import Navbar from './navbar.component';
import Container from 'react-bootstrap/Container';
import styled from 'styled-components';
import Footer from './footer.component';

export default class Main extends Component {

    constructor(props) {
        super(props);
        this.onGreet = this.onGreet.bind(this);
        this.state = {
            isLogin: 'rsdfs'
        }
    }

    onGreet() {
        this.setState({
            isLogin: 'workssss'
        })
    }

    render() {
        return (
            <Router>
                <Navbar onGreet={this.onGreet} isLogin={this.state.isLogin} />
            </Router>
        )
    }
}
