import React, { Component } from 'react';
import axios from 'axios';
import styled from 'styled-components'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Alert from 'react-bootstrap/Alert'


export default class DrinkAdminEdit extends Component {

    mounted = false;

    constructor(props) {
        super(props);

        //this.onNameChange = this.onNameChange.bind(this);
        //this.onBaseIngredientChange = this.onBaseIngredientChange.bind(this);

        this.state = {
            drink_name: '',
            drink_ingredients: [],
            drink_liquors: [],
            drink_special_instructions: '',
            drink_glass: '',
            curated: null,
            alert_success: false,
            alert_unsuccessful: false,
        }
    }

    componentDidMount() {
        this.mounted = true;
        axios.get('http://localhost:4000/byid/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    drink_name: res.data.drink_name,
                    drink_ingredients: res.data.drink_ingredients,
                    drink_liquors: res.data.drink_liquors,
                    drink_glass: res.data.drink_glass,
                    drink_special_instructions: res.data.drink_special_instructions,
                    curated: res.data.curated
                })
            })
            .catch(err => {
                console.log(err);
            })
    }

    componentWillUnmount(){
        this.mounted = false;
    }


    onNameChange = e => {
        this.setState({
            drink_name: e.target.value
        })
    }

    onBaseIngredientChange = e => {
        this.setState({
            drink_special_instructions: e.target.value
        })
    }

    renderIngredients() {
        return this.state.drink_ingredients.map((currentIngredient, i) => {
            return (
                <div key={i}>
                    <button onClick={(e) => this.removeIngredient(i, e)}>-</button>
                    <input type="text" value={currentIngredient} onChange={(e) => this.onIngredientChange(i, e)}></input>
                </div>
            )
        })
    }

    onIngredientChange(index, e) {
        var stateCopy = [...this.state.drink_ingredients];
        stateCopy[index] = e.target.value;
        this.setState({
            drink_ingredients: stateCopy
        });
        //console.log(this.state.drink_ingredients[index].ingredient_name);
    }

    addIngredient() {
        this.setState({
            drink_ingredients: [...this.state.drink_ingredients, '']
        })
        this.renderIngredients();
    }

    removeIngredient(index, e) {
        var new_drink_ingredients = [...this.state.drink_ingredients];
        new_drink_ingredients.splice(index, 1);
        this.setState({
            drink_ingredients: new_drink_ingredients
        })
    }

    // addAlternateName(){
    //     this.setState({
    //         drink_liquors: [...this.state.drink_liquors, '']
    //     })
    //     this.renderAlternateNames();
    // }

    // onAlternateNameChange(index,e){
    //     var stateCopy = [...this.state.drink_liquors];
    //     stateCopy[index] = e.target.value;
    //     this.setState({
    //         drink_liquors: stateCopy
    //     })
    // }
    // removeAlternateName(index, e) {
    //     var stateCopy = [...this.state.drink_liquors];
    //     stateCopy.splice(index, 1);
    //     this.setState({
    //         drink_liquors: stateCopy
    //     })
    // }

    // renderAlternateNames() {
    //     return this.state.drink_liquors.map((currentName, i) => {
    //         return (
    //             <div key={i}>
    //                 <button onClick={(e) => this.removeAlternateName(i, e)}>-</button>
    //                 <input type="text" value={currentName} onChange={(e) => this.onAlternateNameChange(i,e)}></input>
    //             </div>
    //         )
    //     })
    // }


    removeDrink = e => {
        axios.delete('http://localhost:4000/delete/' + this.props.match.params.id)
            .then(res => {
                this.setState({
                    alert_success: true
                })
                setTimeout(() => {
                    this.props.history.goBack();
                }, 1000)
            })
            .catch(err => {
                console.log(err);
            })
    }

    submitChange = async e => {
        e.preventDefault();

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
            drink_glass: this.state.drink_glass,
            curated: this.state.curated
        }

        console.log(obj.drink_liquors)

        axios.post('http://localhost:4000/update/' + this.props.match.params.id, obj)
            .then(res => {
                this.setState({
                    alert_success: true,
                })
                setTimeout(() => {
                    this.props.history.goBack();                 
                }, 1000)
            })
            .catch(err => {
                this.setState({
                    alert_unsuccessful: true
                })
                setTimeout(() => {
                    this.setState({
                        alert_unsuccessful: false
                    })
                }, 1000)
            })
        
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col lg={{ offset: 3, span: 6 }}>
                        <Alert variant="success" show={this.state.alert_success}>
                            Drink Updated!
                        </Alert>
                        <Alert variant="danger" show={this.state.alert_unsuccessful}>
                            Updaate Failed!
                        </Alert>
                        <ContainerStyled>                           
                            <HeaderStyled>
                                {this.state.drink_name}
                            </HeaderStyled>                          
                            <RowStyled>
                                <Col>
                                    <label>Name</label>
                                    </Col>
                                    <Col>
                                    <input type="text" value={this.state.drink_name} onChange={this.onNameChange} />                               
                                    </Col>
                            </RowStyled>
                            <RowStyled>
                                <Col>
                                    <label>Special Instructions</label>
                                    </Col>
                                    <Col>
                                    <input type="text" value={this.state.drink_special_instructions} onChange={this.onBaseIngredientChange}></input>
                                    </Col>
                            </RowStyled>
                            <RowStyled>
                                <Col>
                                    <label>Drink Ingredients</label>
                                    <button onClick={(e) => this.addIngredient(e)}>+</button>
                                </Col>
                                <Col>
                                    {this.renderIngredients()}
                                </Col>
                            </RowStyled>
                            <RowStyled>
                                <Col sm={{span: 6, offset:3}}>    
                                    <ButtonStyled onClick={this.submitChange}>Update</ButtonStyled>
                                    <ButtonStyled onClick={this.removeDrink}>Remove Drink</ButtonStyled>
                                </Col>
                            </RowStyled>
                        </ContainerStyled>
                    </Col>
                </Row>
            </Container>
        )
    }
}

const ContainerStyled = styled(Container)`
background-color: #abeaff;
padding: 20px;
border-radius: 8px;
`

const RowStyled = styled(Row)`
padding-top: 1em;
padding-bottom: 1em;
border-top: 1px solid grey;
`

const ButtonStyled = styled(Button)`
margin: 3px;
`

const HeaderStyled = styled.h1`
  text-align: center;
`