import React , { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const Drink = props => (
    <tr>
        <td>
           <Link to={"/cocktail/"+props.drink._id}>{props.drink.drink_name}</Link>
        </td>
    </tr>
)

export default class Ingredients extends Component {

    mounted = false;

    constructor(props) {
        super(props);

        this.state = {
            drinks: [],
            drink_name: '',
            drink_base_ingredient: '',
            drink_ingredient: [],
            drink_alternate_name: '',
        }
    }

    drinkList(){
        return this.state.drinks.map(function(currentDrink, i) {
            return <Drink drink={currentDrink} key={i} />
        });
    }

    componentDidMount() {
        this.mounted = true;

        axios.get('http://localhost:4000/drinks/byid/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                    drink_name: res.data.drink_name,
                    drink_base_ingredient: res.data.drink_base_ingredient,
                    drink_ingredient: res.data.drink_ingredient,
                    drink_alternate_name: res.data.drink_alternate_name,
                })
            })
            .catch(err => {
                console.log(err);
            })      

        axios.get('http://localhost:4000/drinks/')
            .then(res => {
                this.setState({
                    drinks: res.data
                })
            })
            .catch(err => {
                console.log(err)
            })
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            axios.get('http://localhost:4000/drinks/byid/' + this.props.match.params.id)
                .then(res => {
                    if (this.mounted) {
                        this.setState({
                            drink_name: res.data.drink_name,
                            drink_base_ingredient: res.data.drink_base_ingredient,
                            drink_ingredient: res.data.drink_ingredient,
                            drink_alternate_name: res.data.drink_alternate_name,
                        })
                    }
                })
                .catch(function (err) {
                    console.log(err);
                })
        }
    }

    componentWillUnmount(){
        this.mounted = false;
    }

    render() {
        return (
            <div className="container">
                <h1>{this.state.drink_name}</h1>
                <div className="row">
                    <div className="col-sm-4">
                        <h3>Ingredients</h3>
                        <p>{this.renderIngredients()}</p>
                    </div>
                    <div className="col-sm-4">
                        <h3>Special Instructions</h3>
                        <p>{this.state.drink_alternate_name}</p>
                    </div>
                    <table className="col-sm-4 table">                        
                        <thead>
                            <tr>
                                <th>Similar Drinks</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.drinkList()}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

    renderIngredients() {
        return this.state.drink_ingredient.map((ingredient, i) => {
            return (
                <li key={i}>
                    {ingredient.ingredient_amount + " oz " + ingredient.ingredient_name}
                </li>
            )
        })
    }
}