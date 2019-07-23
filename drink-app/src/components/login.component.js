import React, { Component } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form'
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container'
import Alert from 'react-bootstrap/Alert';
import styled from 'styled-components'

export default class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            isWrong: false
        }
    }

    handleEmailChange = (e) => {
        this.setState({
            isWrong: false,
            email: e.target.value
        });
    }

    handlePasswordChange = (e) => {
        this.setState({
            isWrong: false,
            password: e.target.value
        });
    }

    onSubmit = (e) => {
        e.preventDefault();
        axios.defaults.withCredentials = true;
        axios('http://localhost:4000/api/authenticate', {
            withCredentials: true,
            method: 'POST',
            data: { email: this.state.email, password: this.state.password },
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(res => {
                if (res.status === 200) {
                    this.props.history.push('/admincontrol');
                } 
            })
            .catch(err => {
                this.setState({
                    isWrong: true
                })
                setTimeout(() => {
                    this.setState({
                        isWrong: false
                    });
                }, 2000);
            });
    }

    render() {
        return (
            <ContainerStyled>
            <Col lg={{offset: 4, span: 4}} md={{offset: 2, span: 8}}>
                <FormStyled onSubmit={this.onSubmit}>
                    <Form.Group>
                        <Form.Label>Email</Form.Label>
                        <Form.Control onChange={this.handleEmailChange}></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" onChange={this.handlePasswordChange}></Form.Control>
                    </Form.Group>
                    <Form.Control type="submit" value="Submit" />
                </FormStyled>
                <AlertStyled variant="danger" show={this.state.isWrong}>
                    Invalid Login!
                </AlertStyled>
            </Col>
            </ContainerStyled>
        )
    }
}

const ContainerStyled = styled(Container)`
    margin-bottom:0;
    padding-bottom: 2em;
`

const FormStyled = styled(Form)`
    border: 2px solid black;
    padding: 1em;
    border-radius:8px;
    background-color: #abeaff;
    margin-bottom: 10px;
    font-weight: bold;
    `
const AlertStyled = styled(Alert)`
font-weight: bold;
`