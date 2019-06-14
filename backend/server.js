const mongoose = require('mongoose');
const cors = require('cors');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 4000;
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const secret = process.env.DB_TOKEN;
const withAuth = require('./middleware');
app.use(cookieParser());

const drinkRoutes = express.Router();


//var models = require('./Schema');
var Drink  = require('./Schema');
var User = require('./models/users');

app.use(cors());
app.use(bodyParser.json());
app.use('/drinks', drinkRoutes);


mongoose.connect('mongodb://127.0.0.1:27017/drinks', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('Mongoose DB connected successfully');
    const port = process.env.DB_TOKEN;
    console.log(`Your port is ${port}`);
});

drinkRoutes.route('/api/register').post(function(req, res) {
    const { email, password } = req.body;
    const user = new User({ email, password });
    user.save(function(err) { 
        if(err) {
            res.status(500)
                .send("error registering new user");
        }
        else {
            res.status(200).send("Welcome")
        }
    })
})

drinkRoutes.route('/api/authenticate').post(function(req, res) {
    const { email, password } = req.body;
    console.log(email + ' ' + password );
    console.log(secret);
    User.findOne({ email }, function(err, user) {
      if (err) {
        console.error(err);
        res.status(500)
          .json({
          error: 'Internal error please try again'
        });
      } else if (!user) {
        res.status(401)
          .json({
            error: 'Incorrect email or password'
          });
      } else {
        user.isCorrectPassword(password, function(err, same) {
          if (err) {
            res.status(500)
              .json({
                error: 'Internal error please try again'
            });
          } else if (!same) {
            res.status(401)
              .json({
                error: 'Incorrect email or password'
            });
          } else {
            // Issue token
            const payload = { email };
            const token = jwt.sign(payload, secret, {
              expiresIn: '2hr'
            });
            res.cookie('token', token, { httpOnly: true })
              .sendStatus(200);
              console.log('successful');
              console.log(token);
          }
        });
      }
    });
  });

drinkRoutes.route('/checkToken').get(withAuth, function(req, res) {
    res.sendStatus(200);
    console.log('succesful token');
})

drinkRoutes.route('/:name').get(function (req, res) {
    Drink.findOne({ drink_name : req.params.name }, function(err, drink) {
        res.json(drink);
        //console.log(req.params.name);
    })
})

drinkRoutes.route('/').get(function(req, res) {
    Drink.find(function(err, drinks) {
        if(err){
            console.log(err);
        }
        else{
            res.json(drinks);
        }
    });
});

drinkRoutes.route('/byid/:id').get(withAuth, function(req, res) {
    Drink.findById(req.params.id, function(err, drink) {
        res.json(drink);
    });
});

drinkRoutes.route('/add').post(function(req, res) {
    let drink = new Drink(req.body);
    drink.save()
        .then(drink => {
            res.status(200).json({'drink': 'drink added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new drink failed');
        });
});

drinkRoutes.route('/update/:id').post(function(req, res){
    Drink.findById(req.params.id, function(err, drink) {
        if(!drink){
            res.status(404).send('drink not found');
        }
        else {
            drink.drink_name = req.body.todo_description;
            drink.drink_base_ingredient = req.body.drink_base_ingredient;
            drink.drink_ingredient = req.body.drink_ingredient;
            drink.drink_alternate_name = req.body.drink_alternate_name;

            drink.save()
                .then(drink => {
                    res.json('Todo updated');
                })
                .catch(err => {
                    res.status(404).send("update not possible");
                });
        }
    });
});

drinkRoutes.route('/delete/:id').delete(function(req,res){
    Drink.findByIdAndRemove(req.params.id, function(err, drink){ 
        if(!drink){
            res.status(404).send('drink not found');
        }
        else{
            drink.save()
                .then(drink => {
                    res.json('drink removed');
                });
        }
    });
});

app.listen(PORT, function() {
    console.log("Server is running on: " + PORT);
});
