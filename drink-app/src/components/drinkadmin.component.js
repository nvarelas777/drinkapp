import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import axios from 'axios';
import DrinkAdminAdd from './drinkadminadd.component.js';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container'
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import Button from'react-bootstrap/Button'
import styled from 'styled-components'


const Drink = props => (
    <tr>
        <td>{props.drink.drink_name}</td>
        <td>{props.drink.drink_special_instructions}</td>
        <div className="d-none d-lg-block">
            <td>{props.drink.drink_liquors}</td>
        </div>
        <td>{props.drink.drink_ingredients}</td>
        <td><Link to={"/edit/" + props.drink._id}>Edit</Link></td>
    </tr>
)

export default class DrinkAdmin extends Component {

    mounted = false;

    constructor(props) {
        super(props);

        this.state = {
            isAuth: 'false',
            drinks: [],
            pending_drinks:[],
            open: false
        }
    }

    drinkList() {
        return this.state.drinks.map(function(currentDrink, i) {
            return <Drink drink={currentDrink} key={i}></Drink>
        })
    }

    componentDidMount() {
        this.mounted = true;
        // axios.get('http://localhost:4000/checkToken')
        //     .then(res => {
        //         if (res.status === 200) {
        //             this.setState({
        //                 isAuth: 'true'
        //             })
                    axios.get('http://localhost:4000')
                        .then(res => {
                            this.setState({
                                drinks: res.data
                            })
                        })
                        .catch(err => {
                            console.log(err);
                        })

            //    }
            //     else {
            //         this.setState({
            //             isAuth: 'false'
            //         })
            //     }
            // })
            // .catch(err => {
            //     console.log(err);
            // })
    }

    componentWillUnmount() {
        this.mounted = false;
    }
    handleClick = () => {
        this.setState(prevState => ({
            open: !prevState.open
        }))
    }

    render() {
        //change to false when deployed
        if (this.state.isAuth === 'true') {
            return (
                <div>
                    <h1>Acces Denied</h1>
                    <h1>isAuth: {this.state.isAuth} </h1>
                </div>
            )
        }
        else {
            return (
                <Container>
                    <Row>
                        <p>Pending Approvals:</p>
                        <Link to="/pendingapprovals">test</Link>
                    </Row>
                    <Col sm={{offset:3 , span: 6}}>
                    <Accordion>
                        <CardStyled>
                            <AccordionToggleStyled>
                                <Accordion.Toggle>
                                    <Button onClick={this.handleClick} variant="link" eventKey="0" >Add New Drink</Button>
                                </Accordion.Toggle>
                            </AccordionToggleStyled>
                            <Accordion.Collapse eventKey="0" in={this.state.open} >
                                <Card.Body>
                                    <DrinkAdminAdd setParams={{span: 12}}></DrinkAdminAdd>
                                </Card.Body>
                            </Accordion.Collapse>
                        </CardStyled>
                    </Accordion>                   
                    </Col>
                    <br />
                    <h1> you have access</h1>
                    <TableStyled className="table" borderless>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Ingredient</th>
                                <div className="d-none d-lg-block"> 
                                    <th>Alt Name</th>
                                </div>
                                <th>Drink Ingredients</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.drinkList()}
                        </tbody>
                    </TableStyled>
                </Container>
            )
        }
    }
}

const TableStyled = styled(Table)`
background-color: #abeaff;
border-radius: 7px;
`

const AccordionToggleStyled = styled(Card.Header)`
text-align: center;
background-color: #abeaff;
border: 1px solid black;
border-radius: 7px;
`

const CardStyled = styled(Card)`
border: 0px;
padding-bottom:1em;
`