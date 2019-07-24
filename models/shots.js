const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const shotSchema = new Schema({
    shot_name: {
        type: String,
        unqique: true,
        required: true
    },
    shot_ingredients:[{
        type: String,
        required: true
    }],
    shot_base_ingredient:{
        type: String,
        required: true
    },
    shot_glass:{
        type: String, 
        required: true
    }
})

module.export = mongoose.model('Shots',shotSchema);