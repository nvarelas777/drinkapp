const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const saltRounds = 10;

let drinkSchema = new Schema({
    drink_name: {
        type: String,
        required: true
    },
    drink_ingredients: [{
        type: String,
        required: true        
    }],
    drink_liquors: [{
        type: String,
        required: true
    }],
    drink_special_instructions:{
        type: String
    },
    drink_glass:{
        type: String,
        required: true
    },
    curated:{
        type: Boolean,
        default: false,
        required: true
    }
});

module.exports = mongoose.model('Drink', drinkSchema);