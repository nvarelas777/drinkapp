import React, { Component } from 'react';
import axios from 'axios';

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state= {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        const { value, name } = e.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios('http://localhost:4000/drinks/api/authenticate', {
            method: 'POST',
            data: this.state,
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(res => {
            if (res.status === 200) {
              this.props.history.push('/cocktail/5cf06fe9e87087381cbe28c2');
            } else {
              const error = new Error(res.error);
              throw error;
            }
          })
          .catch(err => {
            console.error(err);
            //alert('Error logging in please try again');
          });
    }

    render(){
        return (
            <form onSubmit={this.onSubmit}>
                <h1> Login Page </h1>
                <input type="email" value={this.state.email} name="email" placeholder="email" onChange={this.handleChange} />
                <input type="password" value={this.state.password} name="password" placeholder="password" onChange={this.handleChange} />
                <input type="submit" value="Submit" />
            </form>
        )
    }
}

