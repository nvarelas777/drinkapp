import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from 'react-bootstrap/Table';
import styled from 'styled-components';


const Drink = props => (
    <TableRowStyled>
        <td>
            <Link to={"/cocktail/" + props.drink._id}>{props.drink.drink_name}</Link>
        </td>
    </TableRowStyled >
)

export default class Ingredients extends Component {

    mounted = false;

    constructor(props) {
        super(props);

        this.state = {
            drinks: [],
            drink_name: null,
            drink_special_instructions: '',
            drink_liquors: [],
            drink_ingredients: [],
            drink_alternate_name: '',
            drink_glass: ''
        }

    }

    drinkList() {
        return this.state.drinks.map(function (currentDrink, i) {
            if( i < 6 ){
                return <Drink drink={currentDrink} key={i} />
            }
            else{
                return
            }
        });
    }

    async componentDidMount() {
        this.mounted = true;
        
        const [firstRes, secondRes] = await Promise.all([
            axios.get('http://localhost:4000/byid/' + this.props.match.params.id),
            axios.get('http://localhost:4000/')
        ])

        this.setState({
            drink_name: firstRes.data.drink_name,
            drink_liquors: firstRes.data.drink_liquors,
            drink_ingredients: firstRes.data.drink_ingredients,
            drink_special_instructions: firstRes.data.drink_special_instructions,
            drink_glass: firstRes.data.drink_glass,
            drinks: secondRes.data
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            axios.get('http://localhost:4000/byid/' + this.props.match.params.id)
                .then(res => {
                    if (this.mounted) {
                        this.setState({
                            drink_name: res.data.drink_name,
                            drink_liquors: res.data.drink_liquors,
                            drink_ingredients: res.data.drink_ingredients,
                            drink_alternate_name: res.data.drink_alternate_name,
                            drink_glass: res.data.drink_glass
                        })
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col>
                        <DrinkNameStyled >{this.state.drink_name}</DrinkNameStyled>
                    </Col>
                </Row>
                <Row>
                    <Col lg={8}>
                        <Row>
                            <Col sm={6} xs={12}>
                                <InfoContainer>
                                    <H3Styled>Ingredients</H3Styled>
                                    <p>{this.renderIngredients()}</p>
                                </InfoContainer>
                            </Col>
                            <Col sm={6} xs={12}>
                                <InfoContainer>
                                    <H3Styled>Special Instructions</H3Styled>
                                    <p>{this.state.drink_special_instructions}</p>
                                </InfoContainer>
                            </Col>
                        </Row>
                        <Row>
                            <Col sm={6}>
                                <InfoContainer>
                                    <H3Styled>Glass Type</H3Styled>
                                    <p>{this.state.drink_glass}</p>
                                </InfoContainer>
                            </Col>
                        </Row>
                    </Col>
                    <Col lg={{offset:0, span: 4}} md={{offset:2, span: 8}}>
                        <Table borderless>
                            <thead>
                                <TableRowHeadStyled>
                                    <th>More Drinks</th>
                                </TableRowHeadStyled>
                            </thead>
                            <TableBodyStyled>
                                {this.drinkList()}
                            </TableBodyStyled>
                        </Table>
                    </Col>
                </Row>
            </Container >
        )
    }

    renderIngredients() {
        return this.state.drink_ingredients.map((ingredient, i) => {
            return (
                <li key={i}>
                    {ingredient}
                </li>
            )
        })
    }
}

const DrinkNameStyled = styled.h1`
text-align:center;
margin-bottom: 25px;
font-size:50px;
color: #ff6655;
`

const H3Styled = styled.h3`
font-size:2em;
font-weight: bold
`

const TableBodyStyled = styled.tbody`
    background-color: #abeaff;
    border: 2px solid black;
`;

const TableRowStyled = styled.tr`
    border: 2px solid black;
`;

const TableRowHeadStyled = styled.tr`
    border-bottom: 2px solid black;
    font-size: 2em;
`;

const InfoContainer = styled(Container)`
background-color: #abeaff;
padding-left: 20px;
padding-bottom: 10px;
padding-top: 10px;
border-radius: 8px;
margin-bottom: 10px;
`