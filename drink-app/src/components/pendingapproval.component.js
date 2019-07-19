import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Table from '../shared/Table.js'

export default class PendingApproval extends Component {
    constructor(props) {
        super(props);

        this.state = {
            drinks: []
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4000/filter/noncurated/')
            .then(res => {
                this.setState({
                    drinks: res.data
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    handleClick(drink) {
        const obj = {
            drink_name: drink.drink_name,
            drink_ingredients: drink.drink_ingredients,
            drink_liquors: drink.drink_liquors,
            drink_glass: drink.drink_glass,
            drink_special_instructions: drink.drink_special_instructions,
            curated: true
        }

        axios.post('http://localhost:4000/update/' + drink._id, obj)
            .then(res => {
                console.log('drink updated');
            })
            .catch(err => {
                console.log(err);
            })
    }

    listIngredients(currentDrink) {
        return currentDrink.drink_ingredients.map((ingredient, i) => {
            return (
                <li key={i}>
                    {currentDrink.drink_ingredients[i]}
                </li>
            )
        })
    }

    drinkList() {
        return this.state.drinks.map((currentDrink, i) => {
            return (
                <tbody key={i}>                 
                    <tr>
                        <td>{currentDrink.drink_name}</td>
                        <td>{currentDrink.drink_glass}</td>
                        <td className="d-none d-md-block">{this.listIngredients(currentDrink)}</td>
                        <td><button  onClick={() => this.handleClick(currentDrink)}>Approve</button></td>
                        <td><Link to={"/edit/" + currentDrink._id}>edit</Link></td>
                    </tr>                   
                </tbody>
            )
        });
    }

    render() {
        return (
            <Container>
                <Table borderless>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Glass Type</th>
                            <th className="d-none d-md-block">Ingredients</th>
                            <th>Approve</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                        {this.drinkList()}
                </Table>
            </Container>
        )
    }
}

