import React, { Component } from 'react';
import axios from 'axios';

export default class Search extends Component {

    constructor(props) {
        super(props);

        this.state={
            searchParams: '',
            value: '',
            drink_name: '',
            drink_liquors: [],
            drink_ingredients: [],
            drink_alternate_name: '',
        }
    }

    componentDidMount() {

        if (this.props.location.state && !this.props.location.state.from.nav) {
            const myKey = this.props.location.state.val;
            console.log(myKey);
        }
        
        axios.get('http://localhost:4000/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                drink_name: res.data.drink_name,
                drink_liquors: res.data.drink_liquors,
                drink_ingredients: res.data.drink_ingredients,
                drink_alternate_name: res.data.drink_alternate_name,
                })
            })
            .catch(err => {
                this.setState({
                    drink_name: 'Drink not found'
                })
            })
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            axios.get('http://localhost:4000/'+this.props.match.params.id)
            .then(res => {
                this.setState({
                drink_name: res.data.drink_name,
                drink_liquors: res.data.drink_liquors,
                drink_ingredients: res.data.drink_ingredients,
                drink_alternate_name: res.data.drink_alternate_name,
                })
            })
            .catch(err => {
                this.setState({
                    drink_name: 'Drink not found'
                })
            })
        }
    }

    render(){
        return (
            <div className="container">
                <h1> Results </h1>
                <h2>drink name:  {this.props.match.params.id}</h2>
                <h2>drink state:  {this.state.drink_name}</h2>
                <h2>drink_liquors: {this.state.drink_liquors} </h2>
            </div>
        )
    }
}
