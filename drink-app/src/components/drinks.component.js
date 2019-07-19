import React, { Component } from 'react';
import axios from 'axios';
import Link from '../shared/styles.js';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row'
import styled from 'styled-components';
import Pagination from 'react-bootstrap/Pagination'

const Drink = props => (
    <TableRowStyled >
        <td><Link to={"/cocktail/" + props.drink._id}>{props.drink.drink_name}</Link></td>
        <td>{printLiquors(props)}</td>
    </TableRowStyled>
)

let printLiquors = props => {
    return props.drink.drink_liquors.join(' / ');
}

export default class Drinks extends Component {

    mounted = false;

    constructor(props) {
        super(props);

        this.state = {
            drinks: [],
            null_search: [],
            search: '',
            currentPage: 1,
            numItems: 5,
        };
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

    componentWillUnmount() {
        this.mounted = false;
    }

    handlePageChange = page => {
        this.setState({
            currentPage: page
        })
    }

    render() {

        const { drinks, numItems, currentPage } = this.state;
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
            let paginationArray = [];
            for (let i = 1; i <=lastPage;i++){
                paginationArray.push(<Pagination.Item key={i} onClick={() => this.handlePageChange(i)}>{i}</Pagination.Item>)
            }
            return paginationArray;
        }

        return (
            <ContainerStyled>
                <Row>
                    <Col lg={{ span: 6, offset: 3 }}>
                        <Form>
                            <FormGroupStyled>
                                <Row>
                                    <Col md={6}>
                                        <Form.Control placeholder="Search by Name" onChange={this.onSearch}></Form.Control>
                                    </Col>
                                </Row>
                            </FormGroupStyled>
                        </Form>
                        <ContainerTableStyled>
                            <Table borderless>
                                <thead>
                                    <TableRowHeadStyled>
                                        <th>Name</th>
                                        <th>Liquor</th>
                                    </TableRowHeadStyled>
                                </thead>
                                <tbody>
                                    {renderDrinks}
                                </tbody>
                            </Table>
                        </ContainerTableStyled>           
                        <Pagination>
                            {createPagination()}
                        </Pagination>
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

const ContainerTableStyled = styled(Container)`
border-radius: 8px;
background-color: #abeaff;
margin-top: 10px;
`

const TableRowHeadStyled =  styled.tr`
    font-size: 20px;
`;

const TableRowStyled = styled.tr`
    font-size: 18px;
    font-weight: bold;
`;
