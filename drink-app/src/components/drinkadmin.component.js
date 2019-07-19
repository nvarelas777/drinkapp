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
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'
import Pagination from 'react-bootstrap/Pagination'
import Form from 'react-bootstrap/Form';

const Drink = props => (
    <TableRowStyled>
        <td>{props.drink.drink_name}</td>
        <td className="d-none d-md-block">{props.drink.drink_special_instructions}</td>
        <td>{printLiquors(props)}</td>
        <td className="d-none d-md-block">{printIngredients(props)}</td>
        <td><Link to={"/edit/" + props.drink._id}>Edit</Link></td>
    </TableRowStyled>
)

let printLiquors = props => {
    return props.drink.drink_liquors.join(' / ');
}

let printIngredients = props => {
    return props.drink.drink_ingredients.map((currentIngredient, i) => {
        return (
            <li key={i}>{currentIngredient}</li>
        )
    })
}

export default class DrinkAdmin extends Component {

    mounted = false;

    constructor(props) {
        super(props);

        this.state = {
            isAuth: 'false',
            drinks: [],
            pending_drinks: [],
            null_search: [],
            open: false,
            numItems: 4,
            currentPage: 1,
            serach: ''
        }
    }

    drinkList = async () => {
        let counter = 0;
        return this.state.drinks.map(function (currentDrink, i) {
            if(counter < 3){
                counter++;
                return <Drink drink={currentDrink} key={i}></Drink>
            }
        })
    }

    componentDidMount() {
        this.mounted = true;
        axios.get('http://localhost:4000/checkToken')
            .then(res => {
                if (res.status === 200) {
                    this.setState({
                        isAuth: 'true'
                    })
        axios.get('http://localhost:4000')
            .then(res => {
                this.setState({
                    drinks: res.data,
                    null_search: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
           }
            else {
                this.setState({
                    isAuth: 'false'
                })
            }
        })
        .catch(err => {
            console.log(err);
        })
    }

    componentDidUpdate(prevProps) {
        if (prevProps !== this.props) {
            axios.get('http://localhost:4000/filter/curated')
                .then(res => {
                    this.setState({
                        drinks: res.data,
                        null_search: res.data
                    })
                })
                .catch(function (err) {
                    console.log(err);
                });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }
    handleClick = () => {
        this.setState(prevState => ({
            open: !prevState.open
        }))
    }

    handlePageChange = page => {
        this.setState({
            currentPage: page
        })
    }

    handleSearch = e => {
        let val = e.target.value.replace(/\s+/g,'');
        if (val=== '') {
            this.setState({
                drinks: this.state.null_search
            })
        }
        else {
            this.setState({
                search: val
            }, this.doSearch);
        }
    }

    doSearch() {
        axios.get('http://localhost:4000/search/' + this.state.search)
            .then(res => {
                this.setState({ 
                    drinks: res.data,
                    currentPage: 1
                 })
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    render() {
        //change to false when deployed
        if (this.state.isAuth === 'false') {
            return (
                <Container>
                    <h3>Please login to continue...</h3>
                </Container>
            )
        }
        else {

            const { drinks, currentPage, numItems } = this.state;
            const indexBegin = currentPage * numItems - numItems;
            const indexEnd = indexBegin + numItems;
            const drinksList = drinks.slice(indexBegin, indexEnd);

            const renderDrinks = drinksList.map((currentDrink,i) => {
                return (
                    <Drink drink={currentDrink} key={i}></Drink>
                )
            })

            const lastPage = Math.floor(drinks.length / numItems);
            const createPagination = () => {
                let paginationLength = [];
                for (let i =1; i <= lastPage; i++){
                    paginationLength.push(<Pagination.Item key={i} onClick={() => this.handlePageChange(i)}>{i}</Pagination.Item>)
                }
                return paginationLength;
            }
            
            
            return (
                <Container>
                    <Row>
                        <Col>
                            <h3><Link to="/pendingapprovals">Pending Approvals</Link> </h3>  
                        </Col>                    
                    </Row>
                    <Col lg={{ offset: 3, span: 6 }}>
                        <Accordion>
                            <CardStyled>
                                <AccordionToggleStyled>
                                    <Button onClick={this.handleClick}>Add New Drink</Button>
                                </AccordionToggleStyled>
                                <Accordion.Collapse eventKey="0" in={this.state.open} >
                                    <Card.Body>
                                        <DrinkAdminAdd setParams={{ span: 12 }}></DrinkAdminAdd>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </CardStyled>
                        </Accordion>
                    </Col>
                    <br />
                    <Row>
                        <Col lg={4} sm={6}>
                    <Form>
                        <Form.Group>
                            <Form.Control placeholder="Search by Name" onChange={this.handleSearch}></Form.Control>
                        </Form.Group>
                    </Form>
                    </Col>
                    </Row>
                        <TableStyled className="table" borderless>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th className="d-none d-md-block">Special Instructions</th>
                                    <th>Liquors</th>
                                    <th className="d-none d-md-block">Drink Ingredients</th>
                                </tr>
                            </thead>
                            <tbody>
                                {renderDrinks}
                            </tbody>
                        </TableStyled>
                    <Pagination>
                        {createPagination()}
                    </Pagination>
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
@media (max-width:480px) {
    background-color: lightgrey;
}
`

const TableRowStyled = styled.tr`
font-size: 18px;
font-weight: bold;
`