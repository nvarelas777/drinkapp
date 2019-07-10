import React, { Component } from 'react';
import Axios from 'axios';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import styled from 'styled-components'

export default class DrinkAdminAdd extends Component {
    constructor(props) {
        super(props);
        this.state = {
            drink_name: '',
            drink_special_instructions: '',
            drink_ingredients: [],
            wasAdded: '',
            drink_glass: '',
            drink_liquors: '',
            dropDownValue: 'Select...'
        }
    }

    handleNameChange = e => {
        this.setState({
            drink_name: e.target.value
        })
    }

    handleSpecialInstructionChange = e => {
        this.setState({
            drink_special_instructions: e.target.value
        })
    }

    handleIngredientChange(index, e) {
        var newIngredient = [...this.state.drink_ingredients];
        newIngredient[index] = e.target.value;
        this.setState({
            drink_ingredients: newIngredient
        })
    }

    renderIngredients() {
        return this.state.drink_ingredients.map((currentIngredient, i) => {
            return (
                <Row key={i}>
                    <Col sm={6}>
                        <Form.Control value={currentIngredient} onChange={(e) => this.handleIngredientChange(i, e)} />
                    </Col>
                </Row>
            )
        })
    }

    handleLiquorChange = e => {
        this.setState({
            drink_liquors: [...this.state.drink_liquors, e.target.value]
        })
    }

    addIngredient() {
        this.setState({
            drink_ingredients: [...this.state.drink_ingredients, '']
        })
        this.renderIngredients();
    }

    glassType = (eventKey) => {
        this.setState({
            drink_glass: eventKey
        })
    }

     onSubmit = async e => {
        e.preventDefault();

        for(var i =0; i <= this.state.drink_ingredients.length;i++){
            if(this.state.drink_ingredients[i] === '' || this.state.drink_ingredients[i] === null){
                var stateCopy = [...this.state.drink_ingredients];
                stateCopy.splice(i, this.state.drink_ingredients.length - i);
                await this.setState({
                    drink_ingredients: stateCopy
                })
            }        
        }

        const liquorSet = new Set(["Vodka", "Rum","Tequila"]);
        
        const liquors = [];
        for(let i = 0; i < this.state.drink_ingredients.length;i++){
            let strLength = this.state.drink_ingredients[i].length;
            while(this.state.drink_ingredients[i].charAt(strLength) !== ' ' && strLength > 0){
                strLength--;
            }
            const ingredient = this.state.drink_ingredients[i].substring(strLength+1, this.state.drink_ingredients[i].length);
            console.log(ingredient);

            if (liquorSet.has(ingredient)){
                liquors.push(ingredient);
            }

        } 
        console.log(liquors);
        await this.setState({
            drink_liquors: liquors
        });
        console.log(this.state.drink_liquors.length);

        const obj = {
            drink_name: this.state.drink_name,
            drink_liquors: this.state.drink_liquors,
            drink_ingredients: this.state.drink_ingredients,
            drink_special_instructions: this.state.drink_special_instructions,
            drink_glass: this.state.drink_glass
        }

        Axios.post('http://localhost:4000/add', obj)
            .then(res => {
                console.log(res.data)
                this.setState({
                    wasAdded: 'Added!'
                });
                setTimeout(() => {
                    this.setState({
                        wasAdded: ''
                    });
                }, 2000);
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    wasAdded: 'Not Added!'

                });
                setTimeout(() => {
                    this.setState({
                        wasAdded: ''
                    });
                }, 2000);
            })

    }

    changeValue(text){
        this.setState({
            dropDownValue: text
        })
    }

    render() {
        return (
            <ContainerStyled>
                <Col sm={this.props.setParams === undefined ? {offset: 3, span :6} : this.props.setParams}>
                <FormStyled>
                    <FormGroupStyled>
                        <Form.Label>Drink Name</Form.Label>
                        <Col>
                            <Form.Control onChange={this.handleNameChange}></Form.Control>
                        </Col>
                    </FormGroupStyled>
                    <FormGroupStyled>
                        <Form.Label>Special Instructions</Form.Label>
                        <Col>
                            <Form.Control as="textarea" rows="3" onChange={this.handleSpecialInstructionChange}></Form.Control>
                        </Col>
                    </FormGroupStyled>
                    <FormGroupStyled>
                        <Form.Label>Ingredients</Form.Label>
                        <Button onClick={() => this.addIngredient()}>+</Button>
                        {this.renderIngredients()}
                    </FormGroupStyled>
                    <FormGroupStyled>
                        <Form.Label>Liquors</Form.Label>
                        <Col>
                        <Form.Control onChange={this.handleLiquorChange}></Form.Control>
                        </Col>
                    </FormGroupStyled>
                    <FormGroupStyled>
                        <Form.Label>Glass Type</Form.Label>
                        <DropdownButton title={this.state.drink_glass} onSelect={this.glassType} title={this.state.dropDownValue}>
                            <Dropdown.Item eventKey="1"><div onClick={(e) => this.changeValue(e.target.textContent)}>Shot</div></Dropdown.Item>
                            <Dropdown.Item eventKey="2"><div onClick={(e) => this.changeValue(e.target.textContent)}>Rocks/Shooter</div></Dropdown.Item>
                            <Dropdown.Item eventKey="3"><div onClick={(e) => this.changeValue(e.target.textContent)}>Bomb</div></Dropdown.Item>
                        </DropdownButton>
                    </FormGroupStyled>
                    <Form.Group>
                        <DivSubmitStyled>
                            <Button onClick={this.onSubmit}>Submit</Button>
                        </DivSubmitStyled>
                    </Form.Group>
                </FormStyled>
                </Col>
            </ContainerStyled>
        )
    }
}

const ContainerStyled = styled(Container)`
padding-bottom: 2em;

`

const FormGroupStyled = styled(Form.Group)`
padding-bottom: 1em;
border-bottom: 1px solid grey;
`

const FormStyled = styled(Form)`
border: 2px solid black;
padding: 1em;
background-color: #abeaff;
border-radius:8px;
`;

const DivSubmitStyled = styled.div`
text-align:center;
`;