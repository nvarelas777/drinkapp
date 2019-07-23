import React, { Component } from 'react';
import axios from 'axios'
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import styled from 'styled-components';
import Link from '../shared/styles.js';
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';

const Drink = props => (
    <tr>
        <td>
            <LinkStyled to={'/cocktail/' + props.drink._id}>{props.drink.drink_name}</LinkStyled>
        </td>
    </tr>
)

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            vodka_drinks: [],
            rum_drinks: [],
            tequila_drinks: []
        }
    }

    async componentDidMount() {

        const [firstRes, secondRes, thirdRes] = await Promise.all([
            axios.get('http://localhost:4000/drinks/Vodka'),
            axios.get('http://localhost:4000/drinks/Rum'),
            axios.get('http://localhost:4000/drinks/Tequila')
        ])

        this.setState({
            vodka_drinks: firstRes.data,
            rum_drinks: secondRes.data,
            tequila_drinks: thirdRes.data
        })
    }

    vodkaList() {
        return this.state.vodka_drinks.map((currentDrink, i) => {
            if (i < 5 ) {
                return <Drink drink={currentDrink} key={i} />
            }
        });
    }

    rumList() {
        return this.state.rum_drinks.map((currentDrink, i) => {
            if( i < 5 ){
                return <Drink drink={currentDrink} key={i} />
            }
        });
    }

    tequilaList() {
        return this.state.tequila_drinks.map((currentDrink, i) => {
            if(i < 5 ){
                return <Drink drink={currentDrink} key={i} />
            }
        });
    }

    render() {
        return (
            <ContainerComponent>
                <Row>
                    <Col lg={{offset:0, span: 4}} md={{offset: 1, span: 10}}>
                        
                            <ContainerTableStyle>
                                <Table borderless>
                                    <thead>
                                        <tr>
                                            <ThBodyHeaderStyle>Vodka Drinks</ThBodyHeaderStyle>
                                        </tr>
                                    </thead>
                                    <TableBody>
                                        {this.vodkaList()}
                                    </TableBody>
                                </Table>
                            </ContainerTableStyle>                      
                    </Col>
                    <Col lg={{offset:0, span: 4}} md={{offset: 1, span: 10}}>
                        <ContainerTableStyle>
                            <Table borderless>
                                <thead>
                                    <tr>
                                        <ThBodyHeaderStyle>Rum Drinks </ThBodyHeaderStyle>
                                    </tr>
                                </thead>
                                <TableBody>
                                    {this.rumList()}
                                </TableBody>
                            </Table>
                        </ContainerTableStyle>
                    </Col>
                    <Col lg={{offset:0, span: 4}} md={{offset: 1, span: 10}}>
                        <ContainerTableStyle>
                            <Table borderless>
                                <thead>
                                    <tr>
                                        <ThBodyHeaderStyle>Tequila Drinks</ThBodyHeaderStyle>
                                    </tr>
                                </thead>
                                <TableBody>
                                    {this.tequilaList()}
                                </TableBody>
                            </Table>
                        </ContainerTableStyle>

                    </Col>
                </Row>
            </ContainerComponent>
        )
    }
}


const TableBody = styled.tbody`
    
`;

const ThBodyHeaderStyle = styled.th`
    font-size: 20px;
    text-align: center;
    text-decoration: underline;
`;

const ContainerTableStyle = styled(Container)`
    width:75%;
    background-color: #abeaff;
    border-radius: 5px;
    padding-bottom:10px;
    padding-top:10px;
    margin-top:10px;
`;

const ContainerComponent = styled(Container)`
    margin-bottom: 0;
    padding-bottom: 2em;
`

const LinkStyled = styled(Link)`
    font-size: 18px;
    font-weight: bold;
`
