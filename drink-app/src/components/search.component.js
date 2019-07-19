import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router,Redirect, Route, Link, NavLink, withRouter } from "react-router-dom";
import Ingredients from './ingredients.component.js'
import styled from 'styled-components'
import Container from 'react-bootstrap/Container'

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
            drink_id: null
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
                drink_id: res.data._id
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
                drink_id: res.data._id
                })
            })
            .catch(err => {
                this.setState({
                    drink_name: 'Drink not found'
                })
            })
        }
    }

    render() {
        const { drink_id } = this.state;
        if (drink_id === null) {
            return (
                <Container>
                    <h1>Invalid Search</h1>
                </Container>
            )
        } else {
            return (
                <Redirect to={"/cocktail/" + drink_id} location={this.props.location} key={this.props.location.key}
                    render={props => <Ingredients {...props} key={this.props.location.key} />} />
            )
        }
    }
}
