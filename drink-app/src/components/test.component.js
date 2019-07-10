import React, { Component } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';

export default class Test extends Component {
    constructor(props){
        super(props);
    }

    render() {
        return (
            <div>
                <button onClick={this.props.onGreet}></button>
            </div>

        )
    }
}