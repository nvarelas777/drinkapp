import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, NavLink, withRouter } from "react-router-dom";
import styled from 'styled-components';
import About from './about.component';
import Drinks from './drinks.component';
import Shots from './shots.component';
import Ingredients from './ingredients.component';
import Search from './search.component';
import Login from './login.component';
import DrinkAdmin from './drinkadmin.component';
import DrinkAdminEdit from './drinkadminedit.component';
import Home from './home.component'
import SubmitRecipe from './drinkadminadd.component';
import PendingApprovals from './pendingapproval.component';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavItem from 'react-bootstrap/NavItem'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'
import Container from 'react-bootstrap/Container';
import myImage from '../images/jumbotronfinal.png';

export default class Navigationbar extends Component {

  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      searchVal: '',
      drinks: []
    }

  }

  handleLogin() {
    this.setState({
      isLogin: 'idk'
    })
    if (this.state.isLogin !== null) {
      console.log('not null');
    }
  }


  handleChange(e) {
    e.preventDefault();
    //this.props.onGret();
    this.setState({
      searchVal: e.target.value
    })
  }


  render() {
    return (
      <ContainerStyled>  
        <ImgWrapper>
          <ImgStyled src={myImage} />
        </ImgWrapper>
        <NavStyle expand="lg">
          <Row>
            <Col sm={12} xs={3}>
              <Navbar.Toggle aria-controls="basic-navbar-nav" />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                  <NavLinkStyle onSelect={() => null} as={NavLink} to="/" exact>Home</NavLinkStyle>
                  <NavLinkStyle as={NavLink} to="/drinks">Drinks</NavLinkStyle>
                  <NavLinkStyle as={NavLink} to="/shots">Shots</NavLinkStyle>
                  <NavLinkStyle as={NavLink} to="/about">About</NavLinkStyle>
                  <NavLinkStyle as={NavLink} to="/submitrecipe">New Cocktail</NavLinkStyle>
                  <li className="navbar-item">
                    <button onClick={this.props.onGreet}></button>
                  </li>
                  {this.props.isLogin === 'workssss' ? <li className="navbar-item"><Link to={{ pathname: '/admincontrol', authorized: this.props.isLogin }} className="nav-link">Control</Link></li> : <p>erwe</p>}
                </Nav>
                <FormNavExpandedStyled inline>
                  <Row>
                    <FormControlStyle type="text" id="searchItem" onChange={this.handleChange} className="mr-sm-2" />
                    <NavLinkStyleSearch as={NavLink} to={"/search=" + this.state.searchVal} className="mr-sm-2">Search</NavLinkStyleSearch>
                  </Row>
                </FormNavExpandedStyled>
              </Navbar.Collapse>
            </Col>
            <Col xs={8}>
              <FormNavStyled>
                <Row>
                  <Col xs={8}>
                    <FormControlStyle type="text" id="searchItem" onChange={this.handleChange} />
                  </Col>
                  <Col xs={4}>
                    <NavLinkStyleSearch as={NavLink} to={"/search=" + this.state.searchVal}>Search</NavLinkStyleSearch>
                  </Col>
                </Row>
              </FormNavStyled>
            </Col>
          </Row>
        </NavStyle>
        <br />
        <Route exact path="/" component={Home} />
        <Route path="/drinks" component={Drinks} />
        <Route path="/about" component={About} />
        <Route path="/shots" component={Shots} />
        <Route path="/cocktail/:id" component={Ingredients} />
        <Route path="/search=:id" component={Search} />
        <Route path='/login' component={Login} onGreet={this.props.onGreet} />
        <Route path='/admincontrol' component={DrinkAdmin} />
        <Route path='/edit/:id' component={DrinkAdminEdit} />
        <Route path='/submitrecipe' component={SubmitRecipe} setParams={{ offset: 3, span: 6 }} />
        <Route path='/pendingapprovals' component={PendingApprovals} />
        <br />
        <Wrapper>
          <Navbar>
            <NavLink to='/login' className="nav-link" >Login</NavLink>
          </Navbar>
        </Wrapper>
      </ContainerStyled>
    )
  }
}

const ImgStyled = styled.img`
max-width:100%;
max-height:100%;
`

const ImgWrapper = styled.section`

`


const Title = styled.h1`
  font-size: 3em;
  text-align: center;
  color: #55beff;
`;

const Wrapper = styled.section`
  padding: 2em;
  background: #ffd58c;
`;

const NavStyle = styled(Navbar)`
  background: #ff6655;
`;

const NavLinkStyle = styled(NavLink)`
  color: black;
  font-weight: bold;
  padding-left:.6em;
  padding-right:.6em;
  padding-top:.3em;
  font-family: Arial, Helvetica, sans-serif;
`;


const FormControlStyle = styled(FormControl)`
  outline: 1em;
  outline-color: black;
  `;

const NavLinkStyleSearch = styled(NavLink)`
  color: black;
  font-weight: bold;
  padding-left:.6em;
  padding-right:.6em;
  padding-top: .4em;
  padding-bottom: .4em;
  outline-width: 0px;
  outline-style: solid;
  background-color: #ffd58c;
  border-radius: 5px;
  margin-top:5px;
`;

const ContainerStyled = styled(Container)`
background-color: white;
padding-right: 0;
padding-left: 0;
padding-bottom: 0;
@media (max-width:480px){
  background-color:lightgrey;
}
`;

const FormNavExpandedStyled = styled(Form)`
  @media (max-width:480px) {
    display: none;
  }
`

const FormNavStyled = styled(Form)`
  @media (min-width:480px) {
    display: none;
  }

`
//#55beff blue
//#ff6655 orange
//#ffd58c yellow
