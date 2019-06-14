import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Drink = props => (
    <tr>
        <td><Link to={"/cocktail/"+props.drink._id}>{props.drink.drink_name}</Link></td>
        <td>{props.drink.drink_base_ingredient}</td>
        <td>{props.drink.drink_alternate_name}</td>
        <td>{props.drink.drink_alternate_name}</td>
    </tr>
)

export default class Drinks extends Component {

    mounted = false;

    constructor(props){
        super(props);

        this.state = {
            drinks: []
        };
    }

    drinkList() {
        return this.state.drinks.map(function(currentDrink, i) {
            return <Drink drink={currentDrink} key={i} />
        });
    }

    componentDidMount() {
        this.mounted = true;

        axios.get('http://localhost:4000/drinks')
            .then(res => {
                this.setState({drinks: res.data})
            })
            .catch(function(err){
                console.log(err);
            });
    }   

    
    render() {
        return (
            <div className="container">
                <h1> Drinks Page!</h1>
                <table className="table table-striped" style={{marginTop:20}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Liquor</th>
                            <th>Ingredients</th>
                            <th>Description</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.drinkList()}
                    </tbody>
                </table>
            </div>
        )
    }
}