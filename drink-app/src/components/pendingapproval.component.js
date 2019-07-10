import React, { Component } from 'react';
import axios from 'axios';
import { BroserRouter, Link } from 'react-router-dom'


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
                <li>
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
                        
                            <div className="row">
                            <td className="col-sm-3">{currentDrink.drink_name}</td>
                            <td className="col-sm-3">{currentDrink.drink_glass}</td>
                            <td className="col-sm-3">{this.listIngredients(currentDrink)}</td>
                            <button className="col-sm-1" onClick={() => this.handleClick(currentDrink)}>Approve</button>
                            <Link to={"/edit/"+currentDrink._id}>edit</Link>
                            </div>
                        </tr>
                    
                </tbody>
            )
        });
    }

    render() {
        return (
            <div className="container">
                <table className="table">
                    <thead>

                        <tr>
                            <div className="row">
                                <th className="col-sm-3">Name</th>
                                <th className="col-sm-3">Glass Type</th>
                                <th className="col-sm-3">Ingredients</th>
                            </div>
                        </tr>

                    </thead>

                    {this.drinkList()}

                </table>
            </div>
        )
    }
}