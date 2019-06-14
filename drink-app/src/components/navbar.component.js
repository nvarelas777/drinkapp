import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import styled from 'styled-components';
import About from './about.component';
import Drinks from './drinks.component';
import Shots from './shots.component';
import Ingredients from  './ingredients.component';
import Search from './search.component';
import Login from './login.component';


export default class Navbar extends Component {
 
    constructor(props){
        super(props);

        this.handleChange = this.handleChange.bind(this);

        this.state = {
            searchVal: ''
        }

    }

    handleChange(e) {
        e.preventDefault();

        this.setState({
            searchVal: e.target.value
        })       
      }


    render() {
        return (
            <div className="container">
            <header>
              <Wrapper>
                <Title>Drink App</Title>
              </Wrapper>
            </header>
            <nav className="navbar navbar-expand-sm navbar-light bg-light">
              <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                  <li className="navbar-item">
                    <Link to="/" className="nav-link">Home</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/drinks" className="nav-link">Drinks</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/shots" className="nav-link">Shots</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/about" className="nav-link">About</Link>
                  </li>
                  <li className="navbar-item">
                    <input type="text" id="searchItem" onChange={this.handleChange}></input>
                    <Link to={"/search="+this.state.searchVal} className="button">Seaarach</Link>
                  </li>
                  <li className="navbar-item">
                    <Link to="/login" className="nav-link">Login</Link>
                  </li>
                </ul>
              </div>
            </nav>
          <br />
          <Route path="/drinks" component={Drinks} />
          <Route path="/about" component={About} />
          <Route path="/shots" component={Shots} />
          <Route path="/cocktail/:id" component={Ingredients} />
          <Route path="/search=:id" component={Search} />
          <Route path='/login' component={Login} />
          </div>
        )
    }
}

const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  color: palevioletred;
`;

const Wrapper = styled.section`
  padding: .5em;
  background: papayawhip;
`;

