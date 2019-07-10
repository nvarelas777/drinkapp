import React, { Component } from 'react';
import axios from 'axios';
import Link from '../shared/styles.js';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import styled from 'styled-components';

const Drink = props => (
    <TableRowStyled >
        <td><Link to={"/cocktail/" + props.drink._id}>{props.drink.drink_name}</Link></td>
        <td>{props.drink.drink_liquors}</td>
    </TableRowStyled>
)

export default class Drinks extends Component {

    mounted = false;

    constructor(props) {
        super(props);

        this.state = {
            drinks: [],
            null_search: [],
            search: '',
        };
    }

    handleClick() {
        console.log('works')
    }

    drinkList() {
        if (this.state.drinks === null || this.state.drinks.length === 0) {
            return (
                <TableRowStyled>
                <td>No Results :(</td>
                <td></td>
            </TableRowStyled>
            )
        }
        return this.state.drinks.map(function (currentDrink, i) {
            return <Drink drink={currentDrink} key={i} />
        });
    }

    componentDidMount() {
        this.mounted = true;
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

    onSearch = e => {
        if (e.target.value === '') {
            this.setState({
                drinks: this.state.null_search
            })
        }
        else {
            this.setState({
                search: e.target.value
            }, this.doSearch);
        }
    }

    doSearch() {
        axios.get('http://localhost:4000/search/' + this.state.search)
            .then(res => {
                this.setState({ drinks: res.data })
            })
            .catch(function (err) {
                console.log(err);
            })
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return (
            <ContainerStyled>
                <Row>
                    <Col sm={{ span: 6, offset: 3 }}>
                        <Form>
                            <FormGroupStyled>
                                <Row>
                                    <Col md={6}>
                                        <Form.Control placeholder="Search" onChange={this.onSearch}></Form.Control>
                                    </Col>
                                </Row>
                            </FormGroupStyled>
                        </Form>
                        <TableStyled borderless>
                            <TableHeadStyled>
                                <TableRowHeadStyled>
                                    <th>Name</th>
                                    <th>Liquor</th>
                                </TableRowHeadStyled>
                            </TableHeadStyled>
                            <tbody>
                                {this.drinkList()}
                            </tbody>
                        </TableStyled>
                    </Col>
                </Row>
            </ContainerStyled>
        )
    }
}

const FormGroupStyled = styled(Form.Group)`
margin-bottom: 0px;
`

const ContainerStyled = styled(Container)`
padding-bottom: .75em;
`;

const TableHeadStyled = styled.thead`
    background-color: white;
`
const TableRowHeadStyled =  styled.tr`
    border-bottom: 2px solid black;
`;

const TableRowStyled = styled.tr`
    border: 2px solid black;
`;


const TableStyled = styled(Table)`
    background-color: #abeaff;
`;