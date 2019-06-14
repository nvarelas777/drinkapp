const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const saltRounds = 10;

let drinkSchema = new Schema({
    drink_name: {
        type: String,
    },
    drink_base_ingredient: {
        type: String,
    },
    drink_ingredient: [{
        ingredient_name: { 
            type: String 
        },
        ingredient_amount: { 
            type: Number 
        },
    }],
    drink_alternate_name: [{
        type: String,
    }]
});

module.exports = mongoose.model('Drink', drinkSchema);