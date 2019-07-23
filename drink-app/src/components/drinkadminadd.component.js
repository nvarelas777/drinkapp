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
import Alert from 'react-bootstrap/Alert';

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
            dropDownValue: 'Select...',
            ingredient_alert: false,
            alert_successful:false,
            alert_unsuccessful: false,
        }

        this.initialState = this.state;
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
                        <Form.Control value={this.state.drink_ingredients[i]} onChange={(e) => this.handleIngredientChange(i, e)} />
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
        if (this.state.drink_ingredients.length < 10) {
            this.setState({
                drink_ingredients: [...this.state.drink_ingredients, '']
            })
        }
        else{
            this.setState({
                ingredient_alert: true
            })
        }
        this.renderIngredients();
    }

    glassType = (eventKey) => {
        this.setState({
            drink_glass: eventKey
        })
    }

    onSubmit = async e => {
        e.preventDefault();

        for (var i = 0; i <= this.state.drink_ingredients.length; i++) {
            if (this.state.drink_ingredients[i] === '' || this.state.drink_ingredients[i] === null) {
                var stateCopy = [...this.state.drink_ingredients];
                stateCopy.splice(i, this.state.drink_ingredients.length - i);
                await this.setState({
                    drink_ingredients: stateCopy
                })
            }
        }

        const liquorSet = new Set(["Vodka", "Rum", "Tequila", "Gin",  ]);

        const liquors = [];
        for (let i = 0; i < this.state.drink_ingredients.length; i++) {
            let strLength = this.state.drink_ingredients[i].length;
            while (this.state.drink_ingredients[i].charAt(strLength) !== ' ' && strLength > 0) {
                strLength--;
            }
            const ingredient = this.state.drink_ingredients[i].substring(strLength + 1, this.state.drink_ingredients[i].length);
            console.log(ingredient);

            if (liquorSet.has(ingredient)) {
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

                this.setState({
                    wasAdded: '',
                    alert_successful: true,
                    drink_name: '',
                    drink_special_instructions: '',
                    drink_ingredients: [],
                    drink_glass: '',
                    dropDownValue: 'Select...',
                });
                setTimeout(() => {
                    this.setState({
                        alert_successful: false
                    });
                }, 3000);
           
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    wasAdded: 'Not Added!',
                    alert_unsuccessful: true,
                });
                setTimeout(() => {
                    this.setState({
                        wasAdded: '',
                        alert_unsuccessful: false
                    });
                }, 3000);
            })

    }

    changeValue(text) {
        this.setState({
            dropDownValue: text
        })
    }

    render() {
        return (
            <ContainerStyled>
                <Col lg={this.props.setParams === undefined ? { offset: 3, span: 6 } : this.props.setParams}>
                    <AlertStyled variant="warning">New cocktails will need admin approval before being visible.</AlertStyled>
                <Row>
                    <Col sm={12}>
                        <AlertStyled variant="success" show={this.state.alert_successful}>
                        Drink Successfully Added!
                        </AlertStyled>
                        <AlertStyled variant="danger" show={this.state.alert_unsuccessful}>
                            Drink Not Added!
                        </AlertStyled>
                    </Col>
                </Row>
                    <FormStyled>
                        <FormGroupStyled>
                            <Form.Label>Drink Name</Form.Label>
                            <Col>
                                <Form.Control value={this.state.drink_name} onChange={this.handleNameChange}></Form.Control>
                            </Col>
                        </FormGroupStyled>
                        <FormGroupStyled>
                            <Form.Label>Special Instructions</Form.Label>
                            <Col>
                                <Form.Control as="textarea" rows="3" value={this.state.drink_special_instructions} onChange={this.handleSpecialInstructionChange}></Form.Control>
                            </Col>
                        </FormGroupStyled>
                        <FormGroupStyled>
                            <Row>
                                <Col sm={3}>
                                    <Form.Label>Ingredients</Form.Label>
                                </Col>
                                <Col sm={{span:6, offset: 3}}>
                                <Alert variant="danger" show={this.state.ingredient_alert}>
                                    Maximum 10 Ingredients!
                                 </Alert>
                                </Col>
                            </Row>
                            <Col>
                                <Button onClick={() => this.addIngredient()}>Add Ingredient</Button>
                            </Col>
                            {this.renderIngredients()}
                        </FormGroupStyled>
                        <FormGroupStyled>
                            <Form.Label>Glass Type</Form.Label>
                            <DropdownButton onSelect={this.glassType} title={this.state.dropDownValue}>
                                <Dropdown.Item eventKey="Shot"><div onClick={(e) => this.changeValue(e.target.textContent)}>Shot</div></Dropdown.Item>
                                <Dropdown.Item eventKey="Rocks"><div onClick={(e) => this.changeValue(e.target.textContent)}>Rocks</div></Dropdown.Item>
                                <Dropdown.Item eventKey="Bomb"><div onClick={(e) => this.changeValue(e.target.textContent)}>Bomb</div></Dropdown.Item>
                                <Dropdown.Item eventKey="Hurricane"><div onClick={(e) => this.changeValue(e.target.textContent)}>Hurricane</div></Dropdown.Item>
                                <Dropdown.Item eventKey="Highball"><div onClick={(e) => this.changeValue(e.target.textContent)}>Highball</div></Dropdown.Item>
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
font-weight: bold;
`

const FormStyled = styled(Form)`
border: 2px solid black;
padding: 1em;
background-color: #abeaff;
border-radius:8px;
font-weight: bold;
`;

const DivSubmitStyled = styled.div`
text-align:center;
`;

const AlertStyled = styled(Alert)`
font-weight: bold;
color:black;`